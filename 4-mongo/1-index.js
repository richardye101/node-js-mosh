const mongoose = require('mongoose');

// local, in prod it will be different. could use an env var/config file
// this returns a promise
mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Create schema for our table
// Types: String, Number, Date, Buffer, Boolean, ObjectID, Array
const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

// Instantiate the course object from class
// Compile the schema into a model
const Course = mongoose.model('Course', courseSchema); // its a class 

async function createCourse(){

    const course = new Course({
        name: 'Angular Course',
        author: 'Richard',
        tags: ['angular', 'frontend'],
        isPublished: true
    }); // schemaless...idk man

    const result = await course.save(); //async operation, mongo will assign an id for us
    console.log(result);
}

// This creates the above course object and puts it in our database
// createCourse();

// Retrieving documents
async function getCourses(){

    // comparison query operators
    // eq (equal), ne(not equal), gt (greater than), gte(greater than or equal), lt, lte, in, nin (not in)

    // logical operators
    // or and and

    // Pagination
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course //returns a promise type object
        // .find( { author: 'Richard', isPublished: true} ) // filter our find operation
        // .find({ price: { $gte: 10, $lte: 20 } }) // all courses with price greater than or equal to 10, but less or equal to 20
        // .find({ price: { $in: [10, 15, 20] } }) // find all courses that have these specific prices

        // .find() //when doing a logical operator, need an empty find()
        // .or([ {author: 'Richard'}, { isPublished: true}]) // pass the two filter objects
        // .and([ {author: 'Richard'}, { isPublished: true}]) // its similar to find(), but in some complex applications this could be better

        // regex
        // a string that starts with Richard (^Richard), ends with string (Richard$)
        // case insensitive(/Richard$/i)
        // contains (/.*Richard.*/) .* says 0 or more characters before or after the searched word

        // .find({ author: /^Richard/ }) 
        // .limit(10)
        // .sort({ name: 1 })// 1 indicates ascending order, -1 is descending
        // .select({name: 1, tags: 1}) // selects properties from objects to return

        // get count of items
        // .find( { author: 'Richard', isPublished: true} )
        // .limit(10)
        // .sort({ name: 1})
        // .count();

        // pagination with .skip(), and url query params
        .find( { author: 'Richard', isPublished: true} )
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1})
    
    console.log(courses);
}

// getCourses();


// Update course objects
async function updateCourse(id){
    // Query first
    // findById()
    // Modify properites
    // save()

    // const course = await Course.findById(id);
    // if(!course) return;
    // if(course.isPublished) return; // if the course is published, we dont wanna change anything
    // course.isPublished = true;
    // course.author = 'Another Author';
    // or (both do the same)
    // course.set({
    //     isPublished:true,
    //     author: "Another Author"
    // })

    // const result = await course.save();
    // console.log(result);
    
    /**************************************************/

    // Alternate Approach: Update first
    // Update directly
    // Optionally: get the updated document

    // const result = await Course.updateOne(
    //     {_id: id},
    //     {$set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }}
    // )
    // console.log(result);

    // Get the object and update
    // const course = await Course.findByIdAndUpdate(
    //     {_id: id},
    //     {$set: {
    //         author: 'Richard',
    //         isPublished: true
    //     }},
    //     {new: true} // gets the updated document
    // )
    // console.log(course);
}

// updateCourse('628ad82a8b5ef9046a35f8e1');

// remove course objects
async function deleteCourse(id){
    const course = await Course.deleteOne({_id: id}); // returns a promise
    // const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// deleteCourse('628ad82a8b5ef9046a35f8e1');