const mongoose = require('mongoose');
const Joi = require('joi'); // capitalize because it is a class

// Task 1:
// create service for managing list of genres
const Genre = mongoose.model('Genre', new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        lowercase: true,
        trim: true
    }
})); //creates a new collection with the specified schema

function validateGenre(genre){
    const schema = Joi.object({
        genre:Joi.string().min(3).required() // only have validation for this
    });
    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;