const auth = require('../../../middleware/auth');
const {User} = require('../../../models/user');
const mongoose = require('mongoose');

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = { // need user so we can make sure the returned user has the correct properties
             _id: mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true
        };
        const token = new User(user).generateAuthToken();

        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {}; // don't need it for this unit test, but need it to call auth
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toMatchObject(user);
    })
})