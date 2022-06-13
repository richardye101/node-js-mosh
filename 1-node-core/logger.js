const EventEmitter = require('events');
// const emitter = new EventEmitter;

var url = 'http://mylogger.io/log';

// console.log(__filename);
// console.log(__dirname);

// Define a class, using Pascal case
class Logger extends EventEmitter{
    log(message){ // a function in a class is a method
        // Send HTTP request
        console.log(message);
        // Raise even
        this.emit('messageLogged', {id:1, url:'http://'});
    }
}

module.exports = Logger;
