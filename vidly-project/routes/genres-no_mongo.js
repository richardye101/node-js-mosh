const express = require('express');
const router = express.Router();

// Task 1:
// create service for managing list of genres
const genres = [
    {id:1, "genre":"horror"},
    {id:2, "genre":"comedy"},
    {id:3, "genre":"romance"},
    {id:4, "genre":"action"}
]

router.get('/', (req,res) => {
    res.send(genres);
});

router.get('/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The requested genre has not been found");
    res.send(genre);
});

// Create new genres
router.post('/', (req,res)=>{
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
router.put('/:id', (req,res)=>{
    const genreIdx = genres.findIndex(g => g.id === parseInt(req.params.id));
    if(genreIdx === -1) return res.status(404).send("The requested genre has not been found");

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genres[genreIdx].genre = req.body.genre;
    res.send(genres[genreIdx]);
});

// Delete genres 
router.delete('/:id', (req, res)=>{
    const genreIdx = genres.findIndex(g => g.id === parseInt(req.params.id));
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    console.log(genre);
    if(!genre) return res.status(404).send("The requested genres has not been found");

    genres.splice(genreIdx,1);
    res.send(genre);
});

function validateGenre(genre){
    const schema = joi.object({
        genre:joi.string().min(3).required() // only have validation for this
    });
    return schema.validate(genre);
}

module.exports = router;