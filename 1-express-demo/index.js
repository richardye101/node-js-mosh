const Joi = require('joi');
const express = require('express');
// It returns a Express object, called app by convention
const app = express();
// A middleware that lets us parse JSON objects in the body of POST requests
app.use(express.json());

const courses = [
    {id:1, name : 'course1'},
    {id:2, name : 'course2'},
    {id:3, name : 'course3'}
];

// Core functions 
// Specify a route and a route handler (callback function)
app.get('/', (req,res)=>{
    // Req has useful properties, look at express documentation at expressjs.com
    res.send('Hello World');
});

app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    // .find is built into every JS array
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {//return 404 error, result not found
        res.status(404).send('The course with the given ID was not found');
    }
    res.send(course);
});

// many route parameters
app.get('/api/posts/:year/:month', (req,res)=>{
    // Send the route parameters to the client
    res.send(req.params);
    // Send any query parameters ("?sortBy=Name")
    res.send(req.query);
});

// Create a new course
app.post('/api/courses', (req,res)=>{
    // manual input validation, use joi instead
    // if(!req.body.name || req.body.name.length < 3){
    //     // return 400 bad request
    //     res.status(400).send('Name is required and at least 3 characters');
    //     return;
    // }

    // define Joi schema for our courses
    const schema = {
      name: Joi.string().min(3).required()  
    };

    const result = Joi.ValidationError(req.body, schema);
    console.log(result);

    // Read course obj in body, use properties to create course obj, and add to array
    const course = {
        id: courses.length + 1,
        name: req.body.name // assumes our obj has a name property
    };
    courses.push(course);
    res.send(course);
});
// app.put();
// app.delete();

// PORT env variable, which is set outside the app
const port = process.env.PORT || 3000;

// App needs to listen on a port
app.listen(port, (req,res)=>{
    console.log(`Listening on port ${port}...`);
});