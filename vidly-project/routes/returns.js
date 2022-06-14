// POST /api/returns {customerId, movieId}
// sets the date returned and rental fee of rentals
// only authenticated users can post

const moment = require('moment');
const joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    // refactored the validation logic into a middleware function, later on can implement for every other route

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('Rental not found');

    if (rental.dateReturned) return res.status(400).send('Return already processed');

    rental.return();
    await rental.save();

    await Movie.findByIdAndUpdate(
        { _id: rental.movie._id},
        { $inc: { numberInStock: 1}}
    );
    
    return res.send(rental);
})

function validateReturn(req){
    const schema = joi.object({
        customerId:joi.objectId().required(),
        movieId:joi.objectId().required()
    });
    return schema.validate(req);
}

module.exports = router;
