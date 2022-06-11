const config = require('config'); // helps with working with jwt tokens, accessing them through env variables

module.exports = function() {
    // Store config settings and overwriting them, using the rc package or config package
    // Use the config package to read config files as well as environment variables
    // console.log(`app name: ${config.get('name')}\nMail Server: ${config.get('mail.host')}\nMail Password: ${config.get('mail.password')}`);


    if(!config.get('jwtPrivateKey')){
        // console.error('FATAL ERROR: jwtPrivateKey is not defined');
        // process.exit(1); // exit when error, 0 means success, anything else is failure

        // Better to throw an except that can be caught with our logging infrastructure
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}