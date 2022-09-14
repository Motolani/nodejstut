//check 
const path = require('path'); //path Module
const os = require('os'); //os module
const log = require('./loggerOld'); //logger

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

log(`Total Memory ${totalMemory}`);
log(`Free Memory ${freeMemory}`);

