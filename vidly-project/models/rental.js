const mongoose = require('mongoose');
const { customerSchema } = require('./customer');
const { movieSchema } = require('./movie');
const Joi = require('joi'); // capitalize because it is a class

const Rental = mongoose.model('Rental', new mongoose.Schema({
    // customer: {
    //     type: customerSchema,
    //     required: true
    // },
    customer: { // if we need other properties, they can just query the actual customer
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 5,
                maxlength:50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255                
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.string().hex().length(24).required(),
        movieId: Joi.string().hex().length(24).required()
        // don't want the client setting the dates or fees
    });
    // console.log('Validating the body of the request...');
    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;