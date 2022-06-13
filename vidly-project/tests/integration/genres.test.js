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
        server.close(); 
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
            expect(res.status).toBe(404); // too generic, need prepopulated genre collection
        });
    });

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {      
            const res = await request(server)
                .post('/api/genres')
                .send({name: 'genre1'});
            expect(res.status).toBe(401); // too generic, need prepopulated genre collection
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            // returns a promise, need to await it
            const token = new User().generateAuthToken();
            
            const res = await request(server)
                .post('/api/genres/')
                .set('x-auth-token', token)
                .send({ genre: '1234' });

            expect(res.status).toBe(400);
        });
        
        it('should return 400 if genre is more than 50 characters', async () => {
            // returns a promise, need to await it
            const token = new User().generateAuthToken();
            
            const name = new Array(52).join('a');

            const res = await request(server)
                .post('/api/genres/')
                .set('x-auth-token', token)
                .send({ genre: name });

            expect(res.status).toBe(400);
        });
    });
});