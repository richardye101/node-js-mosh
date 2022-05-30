const mongoose = require('mongoose');
const { Genre } = require('./genre');
const Joi = require('joi'); // capitalize because it is a class

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        lowercase: true,
        trim: true
    },
    genre: {
        type: Genre.schema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        required: true
    },
    dialyRentalRate: {
        type: Number,
        min: 0,
        required: true
    }
}));

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        numberInStock: Joi.number().min(0).required(),
        dialyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;