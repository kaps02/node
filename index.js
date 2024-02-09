const http = require('http');


const server = http.createServer((req, res) => {

const requireUrl = req.url; 

if (requireUrl === '/home'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h1>welcome to home page!</h1>`);
} 
else if (requireUrl === '/about'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1>About Page</h1>");
    res.end();
}
else if (requireUrl === '/node'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<h1>Nodejs Page</h1>");
} 
else {
    res.writeHead(404);
    res.end("Error 404: Not Found!");
}});
   

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
