const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next){
    console.log('Authenticating...');
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.') // no auth creds to access the resource
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); // will throw except if not valid
        // need to 
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }
}