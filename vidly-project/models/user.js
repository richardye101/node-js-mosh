const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 16
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.number().required(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;