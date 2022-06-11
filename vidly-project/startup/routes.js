// Routes
const express = require('express');
const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

const error = require('../middleware/error');

module.exports = function(app) {
    // Middleware to parse JSON objects from requests
    // Takes a request object and passes control to another middleware function or returns response to client
    // The arrow functions in the .get functions are middleware functions, as they take in a request object
    app.use(express.json());
    // ^Reads the request, and if there is a JSON object in the body, then it will parse it into a JSON and set req.body

    // This middleware function that parses incoming requests with URL encoded payloads (info in the url) and puts it in req.body
    // key=value&key=value
    // Tradition approach, generally not done anymore
    // app.use(express.urlencoded({extended: true}));

    // Routes
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    
    // Error handling
    app.use(error);
}