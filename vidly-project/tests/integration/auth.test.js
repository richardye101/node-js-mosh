const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

describe('auth middleware', () => {
    beforeEach(() => { 
        server = require('../../index'); 
    });
    afterEach(async () => { 
        await server.close(); 
        await Genre.deleteMany({});
    });

    let token;
    beforeEach(() => {
        token = new User().generateAuthToken();
    })

    const exec = async () => {

        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ genre: 'genre1'}); // returns the promise, don't need await here
    }

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});