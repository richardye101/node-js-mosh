const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Only code regarding express routes with customers

// mongoose.connect('mongodb://localhost/vidly')
//     .then(()=> console.log('Connected to Vidly - Customers...'))
//     .catch((err) => console.error('Error', err.message));

router.get('/', async (req, res)=>{
    const customers = await Customer.find().sort({name: 1});
    res.send(customers);
})

router.post('/', auth, async (req, res)=>{
    const { error } = validate(req.body);
    if(error){ return res.status(400).send(error.details[0].message)};

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })

    customer = await customer.save()
    res.send(customer);
})

router.put('/:id', auth, async (req, res)=>{
    const { error } = validate(req.body);
    if(error){ return res.status(400).send(error.details[0].message)};

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }, {new: true});

    if(!customer) res.status(404),send('The requested customer has not been found');

    res.send(customer);
})

router.delete('/:id', auth, async (req, res)=>{
    const customer = Customer.findByIdAndDelete(req.params.id);

    if(!customer) res.status(404).send('The requested customer has not been found');

    res.send(customer);
})

router.get('/:id', async (req, res)=>{
    
})

module.exports = router;