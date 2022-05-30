const { Movie, validate } = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
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
    
})

router.put('/:id', async (req, res) => {
    
})

router.delete('/:id', async (req, res) => {
    
})