// post /api/rentals
// get /api/rentals

const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('Connected to Vidly - Rentals'))
    .catch((err) => console.log('Err', err.message));

router.get('/', async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');
    
    const movie = Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0 ) return res.status(400).send('Movie is not instock');

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
        },
    });

    // Need transaction, need both to complete or roll back. twofacecommit, but not covered. will cover transactions later
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

module.exports = router;