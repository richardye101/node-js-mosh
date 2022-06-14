const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const joi = require('joi'); // capitalize because it is a class

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema = joi.object({
        title: joi.string().min(5).required(),
        // genre: joi.object().keys({
        //     genre:joi.string().min(3).required(),
        //     _id: joi.string().hex().length(24)
        // }), // wrong
        genreId: joi.objectId().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    });
    return schema.validate(movie);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;