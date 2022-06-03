const { Movie, validate } = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to Vidly - Movies"))
    .catch((err) => console.log('Error', err.message));

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) res.status(404).send('Requested movie not found');
    res.send(movie);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    // check for genre
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            genre: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    try{
        movie = await movie.save();; //variable so we can reset genre
        console.log(result);
    }
    catch(err){
        console.error('Error', err.message);
    }

    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        req.body,
        {new: true}
    );

    if(!movie) return res.status(404).send("The requested movie has not been found");
    
    res.send(movie);
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send("The requested movie has not been found");

    res.send(movie);
})

module.exports = router;