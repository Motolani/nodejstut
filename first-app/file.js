const fs = require('fs');
const log = require('./loggerOld'); //logger

fs.readdir('./', function(err, files){
    if (err) console.log('Error', err);
    else console.log('Result', files);
});