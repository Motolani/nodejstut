const http = require('http');
const server = http.createServer();

server.listen(3000);

server.on('connection', (server) => {
    console.log('New connection....');
});

console.log('Listening on port 3000...');