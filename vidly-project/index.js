// this service rent movies
const winston = require('winston'); // for logging errors
const express = require('express');
const app = express();

// refactored all the routes related stuff to a separate module, and passed the express app that we created here
require('./startup/logging')(app); // first in case we get an error loading other stuff
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app); // could conditionally load, not now tho

// Templating, generally not needed?
// app.set('view engine', 'pug'); // no need to require it, express loads it internally
// app.set('views', './views'); // all views/templates are in this folder

// serves static content
app.use(express.static('public'));

// Every logical api endpoint needs a separate file/module

// listen
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    // console.log(`Listening on port ${PORT}...`);
    winston.info(`Listening on port ${PORT}...`);
});

module.exports = server;