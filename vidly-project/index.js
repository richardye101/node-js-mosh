// this service rent movies
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
// `export DEBUG=app:startup,app:db` or `export DEBUG=app:*`
// or we can do `DEBUG=app:startup nodemon index.js` at runtime
const debug = require('debug')('app:startup');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// Custom middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/authentication');

// Routes
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const { use } = require('./routes/movies');

const app = express();

// Store config settings and overwriting them, using the rc package or config package
// Use the config package to read config files as well as environment variables
// console.log(`app name: ${config.get('name')}\nMail Server: ${config.get('mail.host')}\nMail Password: ${config.get('mail.password')}`);

// Templating, generally not needed?
// app.set('view engine', 'pug'); // no need to require it, express loads it internally
// app.set('views', './views'); // all views/templates are in this folder

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // usually undefined
// console.log(`ENV: ${app.get('env')}`); // also gets the node env, sets development by default

// Middleware to parse JSON objects from requests
// Takes a request object and passes control to another middleware function or returns response to client
// The arrow functions in the .get functions are middleware functions, as they take in a request object
app.use(express.json());
// ^Reads the request, and if there is a JSON object in the body, then it will parse it into a JSON and set req.body

// This middleware function that parses incoming requests with URL encoded payloads (info in the url) and puts it in req.body
// key=value&key=value
// Tradition approach, generally not done anymore
// app.use(express.urlencoded({extended: true}));

// serves static content
app.use(express.static('public'));
// Some secure HTTPS header thing
app.use(helmet());

// HTTP request logger, only want this on a development machine
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    // console.log('morgan enabled');
    debug('morgan enabled'); // only runs when an env variable tells it what we want to debug 
}

// Custom middleware function
app.use(logger);
// app.use(auth);

// Routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

// Every logical api endpoint needs a separate file/module

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req,res)=>{
    console.log(`Listening on port ${PORT}...`);
});