// post /api/rentals
// get /api/rentals
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

// mongoose.connect('mongodb://localhost/vidly')
//     .then(()=> console.log('Connected to Vidly - Rentals'))
//     .catch((err) => console.log('Err', err.message));

router.get('/', async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');
    
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0 ) return res.status(400).send('Movie is not in stock');
    
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    // Transaction almost works, mongodb needs a replica which i was too lazy to do...

    // Need transaction, need both to complete or roll back. twofacecommit, but not covered. will cover transactions later
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    const session = await Rental.startSession();
    session.startTransaction();
    try{
        // const opts = { session };
        const A = await rental.save();
        // movie.numberInStock--;
        // 
        await Movie.findByIdAndUpdate(movie._id, { $inc: {numberInStock: -1}}, {new: true});
        await movie.save();
        await session.commitTransaction();
        session.endSession();
        res.send(rental);
        // new Fawn.Task()
        //     .save('rentals', rental) // specify the collection (plural)
        //     .update('movies', {_id: movie._id}, { // specify collection, query object (which movies to update), and the update object
        //         $inc: {numberInStock: -1}
        //     })
        //     // .remove() // read more on Fawn
        //     .run();
    }
    catch(ex) {
        console.log('Error', ex.message);
        await session.abortTransaction();
        session.endSession();
        res.status(500).send('Saving failed.') // 500 is internal server error
    }
});

module.exports = router;