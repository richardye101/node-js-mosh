const mongoose = require('mongoose');
const express = require('express');
const { User, validate } = require('../models/user');
const { Router } = require('express');

const router = express.Router();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to Vidly - Users'))
    .catch((err) => console.error('Error', err.message));

// router.get('/', async (req, res) => {
//     const users = User.find().sort('name');
//     res.send(users);
// });

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Email is already associated with an existing user');
    
    user = new User({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password
    })

    await user.save();

    res.send(user);
});

module.exports = router;