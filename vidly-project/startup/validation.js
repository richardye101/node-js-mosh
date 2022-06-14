// could also be called api.js
const joi = require('joi');

module.exports = function(){
    joi.objectId = require('joi-objectid')(joi);
}