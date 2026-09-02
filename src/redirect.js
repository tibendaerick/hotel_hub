const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, '../logs/scans.json');

// Ensure log directory exists
if (!fs.existsSync(path.dirname(LOG_FILE))) {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

function logScan(clientId, action) {
    let logs = [];
    if (fs.existsSync(LOG_FILE)) {
        try {
            logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
        } catch (e) {
            logs = [];
        }
    }
    
    logs.push({
        clientId,
        action,
        timestamp: new Date().toISOString()
    });

    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

const server = http.createServer((req, res) => {
    const urlParts = req.url.split('/').filter(Boolean);

    // Route structure: /r/:clientId/:action
    if (urlParts[0] === 'r' && urlParts.length >= 2) {
        const clientId = urlParts[1];
        const action = urlParts[2] || 'hub';
        const clientConfigPath = path.join(__dirname, `../clients/${clientId}.json`);

        if (fs.existsSync(clientConfigPath)) {
            const config = JSON.parse(fs.readFileSync(clientConfigPath, 'utf8'));
            let targetUrl = `/dist/h/${clientId}/index.html`;

            if (action === 'menu') targetUrl = config.menuUrl;
            if (action === 'table') targetUrl = config.tableReservationUrl;
            if (action === 'room') targetUrl = config.roomBookingUrl;

            logScan(clientId, action);

            res.writeHead(302, { 'Location': targetUrl });
            return res.end();
        }
    }

    // Fallback 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route or client not found.');
});

server.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(` Dynamic Redirect Engine Active!`);
    console.log(` Listening on port: ${PORT}`);
    console.log(`========================================\n`);
});
