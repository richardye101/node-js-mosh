// handles any error in the request processing pipeline

const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log exception
    // winston.log('error', err.message);
    winston.error(err.message, err);
    console.log(err);
    // winston levels
    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.'); // internal server error
}