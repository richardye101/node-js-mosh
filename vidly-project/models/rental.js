const mongoose = require('mongoose');
const moment = require('moment');
const { customerSchema } = require('./customer');
const { movieSchema } = require('./movie');
const joi = require('joi'); // capitalize because it is a class

const rentalSchema = new mongoose.Schema({
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
});

rentalSchema.statics.lookup = function(customerId, movieId) {
    return this.findOne({ // let caller await the promise, this references the Rental class
        'customer._id': customerId,
        'movie._id': movieId
    });
};

rentalSchema.methods.return = function() {
    this.dateReturned = new Date();

    const rentalDays = moment().diff(this.dateOut, 'days')
    this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

const Rental = mongoose.model('Rental', rentalSchema);


function validateRental(rental){
    const schema = joi.object({
        customerId: joi.objectId().required(),
        movieId: joi.string().hex().length(24).required()
        // don't want the client setting the dates or fees
    });
    // console.log('Validating the body of the request...');

    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;