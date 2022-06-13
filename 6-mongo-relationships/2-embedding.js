// Author is a sub-document of course with embeddings

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // make a property of a subdocument required
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
  // {
  //   type: authorSchema,
  //   required: true // make a subdocument required
  // }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

// createCourse('Node Course',[
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'John' })
// ]);

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  // const course = await Course.findById(courseId);
  // course.author.name = 'Richard Ye';
  // course.save()

  // directly update
  // const course = await Course.updateOne({_id: courseId}, {
  //   $set: {
  //     'author.name': 'John Smith'
  //   }
  // });

  // remove author
  const course = await Course.updateOne({_id: courseId}, {
    $unset: {
      'author': '' // or 'author.name'
    }
  });
}
// updateAuthor('628d9f8237ffc5787f3f6527');

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
// addAuthor('628da35fadd86e9fc903acce', new Author({name: 'Richard'}));

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('628da35fadd86e9fc903acce', '628da35fadd86e9fc903accd');
