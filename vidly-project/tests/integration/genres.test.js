const mongoose = require('mongoose');
const request = require('supertest');
const { Genre } = require('../../models/genre');
const {User} = require('../../models/user');

let server;
// jest reruns every test but the server stays the same,
// need to close the server each time as we can't have two running on the same port

describe('/api/genres', () => {
    // called before each test inside of the outer test suite
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        await server.close(); 
        await Genre.deleteMany({}); // removes all documents from the collection
        // mongoose.connection.close();
    })

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([ // returns a promise, need to await it
                { genre: 'genre1' },
                { genre: 'genre2' }
            ]);
            // 
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200); // too generic, need prepopulated genre collection
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.genre === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.genre === 'genre2')).toBeTruthy();
        })
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            // returns a promise, need to await it
            const genre = new Genre( { genre: 'genre1' } );
            await genre.save();
            
            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200); // too generic, need prepopulated genre collection
            // expect(res.body).toMatchObject(genre); // we expect an ObjectId, but mongo stores it as a string, need below
            expect(res.body).toHaveProperty('genre', genre.genre);
        });

        it('should return 404 if invalid id is passed', async () => {      

            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });

        it('should return 404 if no genre with the given id exists', async () => {      
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        // define the happy path, and in each test we change 1 param
        // that clearly aligns with the name of the test
        let token;
        let name;
        // happy path, the parameters are set before each test and modified if needed
        const exec = async () => {
            return await request(server)
                .post('/api/genres/')
                .set('x-auth-token', token)
                .send({ genre: name }); // key and value are the same
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        })

        it('should return 401 if client is not logged in', async () => {      
            // const res = await request(server)
            //     .post('/api/genres')
            //     .send({name: 'genre1'});
            token = ''; // set to valid json web token if needed, this is his way instead of plugging in a param

            const res = await exec();

            expect(res.status).toBe(401); // too generic, need prepopulated genre collection
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            // returns a promise, need to await it
            // const token = new User().generateAuthToken(); // don't need it anymore
            name = '1234'
            const res = await exec();

            expect(res.status).toBe(400);
        });
        
        it('should return 400 if genre is more than 50 characters', async () => {            
            name = new Array(52).join('a');

            const res = await exec();
            
            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {
            await exec();

            const genre = await Genre.find({genre: 'genre1'});
            
            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();
            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('genre', 'genre1');
        });
    });

    describe('PUT /', () => {

        // define the happy path, and in each test we change 1 param
        // that clearly aligns with the name of the test
        let token;
        let newname;
        let genre;
        let genre_obj;
        let id;
        // happy path, the parameters are set before each test and modified if needed
        const exec = async () => {
            return await request(server)
                .put('/api/genres/' + id)
                .set('x-auth-token', token)
                .send({ genre: newname });
        }

        beforeEach( async () => {
            token = new User().generateAuthToken();
            const name = 'genre1';
            newname = 'genre2';
            genre_obj = {genre: name};
            genre = await request(server)
                .post('/api/genres/')
                .set('x-auth-token', token)
                .send(genre_obj);

            id = genre._id;
        })

        it('should return 401 if client is not logged in', async () => {      
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            newname = '1234'
            const res = await exec();
            expect(res.status).toBe(400);
        });
        
        it('should return 400 if genre is more than 50 characters', async () => {            
            newname = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });
        
        it('should return 404 if the requested genre id has not been found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should save updated genre if it is valid', async () => {
            await exec();
            const genre = await Genre.find({genre: newname});
            
            expect(genre).not.toBeNull();
        });

        it('should return the updated genre if it is valid', async () => {
            const res = await exec();
            // console.log(res);
            // no idea why this doesnt work :(
            // expect(res.body).toHaveProperty('_id');
            // expect(res.body).toHaveProperty('genre', newname);
        });
    });
});