const EventEmitter = require('events');
const emitter = new EventEmitter();

//The order is important, REGISTER before you RAISE an Event
//Register Listner without Arg(could use arrow function here too)
emitter.on('messageLogged', function(){
    console.log('Event Listner without Arg called');
})

//Register Listner with Arg with arrow function
emitter.on('messageLoggedWithArg', (arg) => {
    console.log('Event Listner with Arg called', arg);
})

//Raise an event
emitter.emit('messageLogged');
emitter.emit('messageLoggedWithArg', {id: 1, url: 'http://'});