const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash'); // makes returning properties of objects easier
const bcrypt = require('bcrypt'); //hashing passwords
const { User, validate } = require('../models/user');
const { Router } = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// mongoose.connect('mongodb://localhost/vidly')
//     .then(() => console.log('Connected to Vidly - Users'))
//     .catch((err) => console.error('Error', err.message));

// uses a jwt, cannot be forged
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    if (!req.body.password) return res.status(400).send("Password is required..");

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Email is already associated with an existing user');
    
    // user = new User({
    //     email: req.body.email,
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     password: req.body.password
    // })
    user = new User(
        _.pick(req.body, ['name', 'email', 'phone', 'password'])
    );
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'phone']))
    // dont wanna send password, use lodash to simplify
    // res.send(user);
    // res.send(_.pick(user, ['_id', 'name', 'email', 'phone']));
});

module.exports = router;