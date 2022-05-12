// this service rent movies
const express = require('express');
const logger = require('./logger');
const auth = require('./authentication');
const Joi = require('joi'); // capitalize because it is a class

const app = express();

// Middleware to parse JSON objects from requests
// Takes a request object and passes control to another middleware function or returns response to client
// The arrow functions in the .get functions are middleware functions, as they take in a request object
app.use(express.json());
// ^Reads the request, and if there is a JSON object in the body, then it will parse it into a JSON and set req.body

// A middleware function that parses incoming requests with URL encoded payloads (info in the url) and puts it in req.body
// key=value&key=value
// Tradition approach, generally not done anymore
app.use(express.urlencoded({extended: true}));
// serves static content
app.use(express.static('public'));

// Custom middleware function
app.use(logger);
app.use(auth);


// Task 1:
// create service for managing list of genres
const genres = [
    {id:1, "genre":"horror"},
    {id:2, "genre":"comedy"},
    {id:3, "genre":"romance"},
    {id:4, "genre":"action"}
]

app.get('/', (req,res)=>{
    res.send("Welcome to my website of movie genres");
});

// Need endpoint to get all genres
app.get('/api/genres', (req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The requested genre has not been found");
    res.send(genre);
});

// Create new genres
app.post('/api/genres', (req,res)=>{
    // object destructuring!
    const { error } = validateGenre(req.body);
    // 400 is bad request
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        "id" : genres.length + 1,
        "genre" : req.body.genre
    }
    genres.push(genre);
    res.send(genre);
});

// Update genres
app.put('/api/genres/:id', (req,res)=>{
    const genreIdx = genres.findIndex(g => g.id === parseInt(req.params.id));
    if(genreIdx === -1) return res.status(404).send("The requested genre has not been found");

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genres[genreIdx].genre = req.body.genre;
    res.send(genres[genreIdx]);
});

// Delete genres 
app.delete('/api/genres/:id', (req, res)=>{
    const genreIdx = genres.findIndex(g => g.id === parseInt(req.params.id));
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    console.log(genre);
    if(!genre) return res.status(404).send("The requested genres has not been found");

    genres.splice(genreIdx,1);
    res.send(genre);
});

function validateGenre(genre){
    const schema = Joi.object({
        genre:Joi.string().min(3).required() // only have validation for this
    });
    return schema.validate(genre);
}
// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req,res)=>{
    console.log(`Listening on port ${PORT}...`);
});