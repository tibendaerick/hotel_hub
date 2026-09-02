const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url === '/' ? '/dist/h/hbhotel_hoima/index.html' : req.url;
    let filePath = path.join(__dirname, '..', reqUrl);

    // Default directory visits to index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>Client hub asset does not exist.</p>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(` Local Preview Server Running!`);
    console.log(` Open your phone browser and go to:`);
    console.log(` http://localhost:${PORT}/dist/h/hbhotel_hoima/`);
    console.log(` http://localhost:${PORT}/dist/h/hoima_bites/`);
    console.log(` http://localhost:${PORT}/dist/h/mubende_inn/`);
    console.log(`========================================`);
    console.log(` Press CTRL + C in Termux to stop server.`);
    console.log(`========================================\n`);
});
