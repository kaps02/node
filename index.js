const http = require('http');
const handleRequest = require('./route');

const server = http.createServer(handleRequest);

server.listen(1000, () => console.log("Server is running on http://localhost:1000"));
