// function sayHello(name){
//     console.log('Hello ' + name);
// }
// sayHello('Richard');
// console.log(window);

// const log = require('./logger');
// console.log(log);
// log('message');


const path = require('path');
// var pathObj = path.parse(__filename);
// console.log(pathObj);

const os = require('os');
// var freeMem = os.freemem()
// var totalMem = os.totalmem()
// console.log(`Total Memory: ${totalMem}`);
// console.log(`Free Memory: ${freeMem}`);

const fs = require('fs');
// // never use Sync methods, which are blocking and sequential
// // always use async
// var files = fs.readdirSync('./'); // all files and folders 
// // async methods need a callback function which it passes errors and the result
// files = fs.readdir('./', function(err, files) {
//     if (err) console.log(`Error ${err}`);
//     else console.log(`Result ${files}`);
// });

// Class, a container for many methods uses Capital first letters for each word
const EventEmitter = require('events');
// Create a new instance of an EventEmitter
// const emitter = new EventEmitter();
// Register a listener taking the name of the event and a callback function that is called when the event is raised
// emitter.on('messageLogged', function(arg){
//     console.log("Listener called", arg);
// });
// using an arrow function instead
// emitter.on('messageLogged', (arg)=>{
//     console.log("Listener called", arg);
// });
// raises an event, produces a noise/message that an event happened
// Needs a listener function that is called when this event happens
// Can put in event arguments (data) as well, this is an object
// Moved to logger
// emitter.emit('messageLogged', {id:1, url:'http://'});

// Using a class in logger so we use the same instance of event emitter. all the above event stuff is moved to logger.js
const Logger = require('./logger');
// const logger = new Logger();
// logger.on('messageLogged',(arg) => {
//     console.log("Listener called", arg);
// });

// logger.log('message');

const http = require('http');
// also an event emitter!
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url ==='/api/courses'){
        // converts a JSON object, array here, into a string
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
}); 

// Register a listener, 'connection' is a predefined event
// server.on('connection', (socket)=>{
//     console.log('New connection...');
// });
// Listen on a specific port/socket
server.listen(3000);

console.log('Listening on port 3000...');

