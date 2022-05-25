const {Genre, validate } = require('../models/genre');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to Vidly - Genres...'))
    .catch(err => console.error('Error', err));

router.get('/', async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req,res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("The requested genre has not been found");
    res.send(genre);
});

// Create new genres
router.post('/', async (req,res)=>{
    // object destructuring!
    const { error } = validate(req.body);
    // 400 is bad request
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({genre: req.body.genre});
    // try{
    genre = await genre.save(); //variable so we can reset genre
        // console.log(result);
    // }
    // catch(err){
        // console.error('Error', err.message);
    // }
    res.send(genre);
});

// Update genres
router.put('/:id', async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,
        {genre: req.body.genre},
        {new: true}
    );

    if(!genre) return res.status(404).send("The requested genre has not been found");
    
    // genres[genreIdx].genre = req.body.genre;
    res.send(genre);
});

// Delete genres 
router.delete('/:id', async (req, res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send("The requested genres has not been found");
    res.send(genre);
});

module.exports = router;