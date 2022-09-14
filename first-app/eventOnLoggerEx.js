const Logger = require('./logger');
const logger = new Logger();

//Register a listner 
logger.on('messageLogged', (arg) => {
    console.log('Listner called', arg);
});

logger.log('message');