const joi = require('joi');
const pwd_complex = require('joi-password-complexity');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash'); // makes returning properties of objects easier
const bcrypt = require('bcrypt'); //hashing passwords
const { User } = require('../models/user');
const { Router } = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    if (!req.body.password) return res.status(400).send("Password is required..");
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if(!validPwd) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    // JSON Web token: A long string that identifies a user. Need to pass private key
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    res.send(token);
});

function validate(req){
    const schema = joi.object({
        email: joi.string().email().min(5).max(255).required(),
        password: new pwd_complex({
            min:5,
            max:32,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 3
        })
    })

    return schema.validate(req);
}

module.exports = router;