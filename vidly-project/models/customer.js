// Single responsibility principle: A single module is only responsible for a single thing
// This module is responsible for defining and validating a customer object is
const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
        match: /[0-9]/
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(cust){
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required().alphanum()
    })
    return schema.validate(cust);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;