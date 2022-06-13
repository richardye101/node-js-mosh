const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error', err));

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // only meaningful in mongoose, mongo doesnt care
        minlength: 5, //string validators
        maxlength: 255,
        // match: /pattern/
    }, 
    category: { // categorical validators
        type: String,
        enum: ['web', 'mobile', 'network'],
        required: true,
        lowercase: true,
        // uppercase: true,
        trim: true // removes padding around string
    },
    author: String,
    date: {type: Date, default: Date.now},
    tags: {
        type: Array,
        validate: { //custom validator, optionally we can set message
            isAsync: true,
            validator: function(v, callback) { // the value, in this case the object for tag and callback fnc
                // setTimeout(() => {
                //     // Doing some async work, currently doesnt work...
                //     const result = v && v.length > 0; // could be the result reading from a database
                //     callback(result);
                // },1000);
                return v && v.length > 0; // if we have 1 or more items, its valid
            },
            message: 'A course should have at least one tag.'
        }
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ // cannot use an arrow function, `this` does not refer to the Course
            return this.isPublished; // references this course object and only req when published is true
        },
        min: 10, // number validators
        max: 100, // number validators
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});

// A Class object
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Test course',
        category: 'Web',
        author: 'Richard',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    })
    try{
        // course.validate((err)=>{
            // if(err){ // could replace the catch block below, but its messy

            // }
        // }); // returns a promise of void, no result. could return a boolean. instead need callbacks

        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
        // ex.errors.tags
        // console.log(ex.message);
    }
}

// createCourse();

// look at how the custom getter and setter work, this case rounds price
async function getCourses(){
    const courses = await Course
        .find({
            author: 'Richard',
            price: {$gte: 15}
         })
        .select({author: 1, name:1, price: 1})
    console.log(courses);
}

getCourses();