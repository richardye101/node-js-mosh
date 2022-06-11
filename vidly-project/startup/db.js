const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() { 
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to MongoDB...')); //console.log('Connected to Vidly Database'))
        // .catch((err) => console.error('Error', err.message)); // don't need this as we handle errors with winston
}