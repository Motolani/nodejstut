var url = 'http://mylogger.io/log';

function log(message){
    // Send an HTTP request
    console.log(message);
}

//exporting an object
//module.exports.log = log;

//its made reference to like this below
//const logger = require('./logger'); logger.log('it works');

//seems we have only a function to export, we dont need to export an object

module.exports = log;

//will be called like this: logger('message');