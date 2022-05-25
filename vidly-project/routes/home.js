const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    // res.send("Welcome to my website of movie genres");
    res.render('index', {title:"My Express App", message:"Hello"})
});

module.exports = router;