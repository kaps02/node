const fs = require('fs');

const handleRequest = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>');
            if (data) {
                res.write('<p>Message: ' + data + '</p>');
            }
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
            res.write('</body></html>');
            res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('this page is Not define');
    }
};

module.exports = handleRequest;


//exports.handleRequest = handleRequest;

//exports = handleRequest;
