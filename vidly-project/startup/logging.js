// handles errors for you, so you don't need to pass the route handler function
// to the asyncMiddleware function, which runs a try catch block of your code for you
// see genres.js GET req for example
require('express-async-errors'); 

const winston = require('winston'); // default logger
const { format } = require('winston');
// require('winston-mongodb'); // might not work when implementing integration tests, need to comment out if needed

const morgan = require('morgan');
// `export DEBUG=app:startup,app:db` or `export DEBUG=app:*`
// or we can do `DEBUG=app:startup nodemon index.js` at runtime
const debug = require('debug')('app:startup');

module.exports = function(app) {

    // to handle an except in a node process outside of express
    // process.on('uncaughtException', (ex) =>{ //subcribe to uncaught exceptions, will not work with async code though
    //     // console.log('We got an uncaught exception');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });
    // or directly using winston, which can handle rejections as well
    winston.exceptions.handle(
        new winston.transports.Console( {colorize: true, prettyPrint: true} ),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) =>{ //subcribe to uncaught exceptions, will not work with async code though
        // console.log('We got an unhandled rejection');
        // winston.error(ex.message, ex);
        // process.exit(1);
        // or
        throw ex; //which throws an unhandled exception, which will be caught above since winston may not do promise rejections yet
    });

    winston.add(
        new winston.transports.Console({colorize: true, prettyPrint: true, level: 'info'}),
        new winston.transports.File({filename: 'logfile.log'}));
        
    // can't use when running integration tests
    // winston.add(new winston.transports.MongoDB({ 
    //     db: 'mongodb://localhost/vidly',
    //     level: 'error', // only error messages will be logged in the db
    //     format: format.metadata() // get the metadata set in the db
    // })); //logs errors to mongodb

    // Trying out errors
    // const p = Promise.reject(new Error('Somthing failed miserably!'));

    // p.then(() =>{ console.log('Done')});
    // throw new Error('Something failed during startup.'); // outside the context of express, winston will not be able to store it


    // console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // usually undefined
    // console.log(`ENV: ${app.get('env')}`); // also gets the node env, sets development by default

    // HTTP request logger, only want this on a development machine
    if (app.get('env') === 'development'){
        app.use(morgan('tiny'));
        // console.log('morgan enabled');
        debug('morgan enabled'); // only runs when an env variable tells it what we want to debug 
    }
}