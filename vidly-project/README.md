# Intro

I have implemented CRUD operations for 8 routes, increased readability by factoring my code and making comments literally everywhere, created **mongoose** models for each of my MongoDB collections, and implemented input validation among other features. The returns route was created using Test Driven Development.

# Where is it?

This backend app has been deployed on Heroku at https://infinite-shelf-96100.herokuapp.com/ (it has no front end, but that wasn't the focus of this course. The main features are that you can send GET, POST, PUT and DELETE requests to various api endpoints within the app, with authentication middleware ensuring you are authenticated and authorized to do so using a request header.

The MongoDB instance is setup on MongoDB Atlas and connected using an environment variable set in Heroku.

# Playing with it

Feel free to send Postman requests to https://infinite-shelf-96100.herokuapp.com/api!

Create a user for yourself using:
- `POST` to https://infinite-shelf-96100.herokuapp.com/api/users with raw JSON body like below:
```
{
    "name": "Richard",
    "phone": 1234567890,
    "email" :"email@email.com",
    "password" : "Bonjour"
}
```
- Copy the `x-auth-token` from the response header to use when sending future requests
- `POST` to https://infinite-shelf-96100.herokuapp.com/api/genres with raw JSON body like below and a request header with `x-auth-token` set to what you copied above:
```
{
    "genre": "Thriller"
}
```
- `GET` to https://infinite-shelf-96100.herokuapp.com/api/genres with no body or header values set and you should see the _Thriller_ object!

# Testing

The Returns route was built using TDD, so any bugs are caught as soon as possible without having to test edge cases.

Test code with `npm test` which runs jest. Jest may not be the best testing package for mongoose, but it's what Mosh taught. There were some hurdles I had to jump over to get it to work, such as setting `--runInBand` so tests would run sequentially and multiple mongo connections wouldn't interfere with eachother.

Jest also comes with code coverage, which I used to get a big picture idea of how much of my code I had tests for.
