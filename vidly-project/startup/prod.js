const helmet = require('helmet'); // protecting the application from web vulnerabilities
const compression = require('compression'); // compresses the http response sent to client

module.exports = function(app) {
    // Some secure HTTPS header thing
    app.use(helmet());
    
    app.use(compression);
}