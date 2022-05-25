const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log("Connected to mongo-exercises db..."))
    .catch(err => console.error('Error', err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: {type: Date, default: Date.now},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

//model is neede to query 
const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    // Exercise 1
    // return await Course
    //     .find({isPublished: true, tags: 'backend'})
    //     .sort({name: 1}) // or 'name' or '-name' (dash means descending)
    //     .select({name: 1, author: 1}); // or 'name author'

    // Exercise 2
    // return await Course
    //     .find({isPublished: true, tags: { $in: ['frontend', 'backend']}}) // or use the .or() 
    //     // .or([{tags: 'backend'}, {tags:'frontend'}])
    //     .sort('-price')
    //     .select('name author price')

    // Exercise 3
    return await Course
        .find({isPublished:true})
        .or([
            {price: {$gte: 15}},
            {name: {$in: /.*by.*/}}
        ])
        .sort('-price')
        .select('name author price');
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();