const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() { 
    const db = config.get('db')
    mongoose.connect(db)
        .then(() => winston.info(`Connected to ${db}...`)); //console.log('Connected to Vidly Database'))
        // .catch((err) => console.error('Error', err.message)); // don't need this as we handle errors with winston
}