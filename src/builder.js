const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const clientConfigPath = process.argv[2];

if (!clientConfigPath) {
    console.error('[ERROR] Please provide a client config JSON path.');
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(clientConfigPath, 'utf8'));
const outDir = path.join(__dirname, `../dist/h/${config.clientId}`);

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

function renderTemplate(srcFile, outFile) {
    let tpl = fs.readFileSync(path.join(__dirname, `../templates/${srcFile}`), 'utf8');
    tpl = tpl
        .replace(/{{HOTEL_NAME}}/g, config.hotelName || 'Hotel Hub')
        .replace(/{{TAGLINE}}/g, config.tagline || 'Hospitality Experience')
        .replace(/{{PRIMARY_COLOR}}/g, config.primaryColor || '#FF5722')
        .replace(/{{LOGO_URL}}/g, config.logoUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&auto=format&fit=crop')
        .replace(/{{ADMIN_PHONE}}/g, config.adminPhone || '256700000000');
    
    fs.writeFileSync(path.join(outDir, outFile), tpl);
}

// Render all hub static sub-pages
renderTemplate('index.html', 'index.html');
renderTemplate('menu.html', 'menu.html');
renderTemplate('booking.html', 'booking.html');
renderTemplate('inquiry.html', 'inquiry.html');

// Generate Dynamic QR Code
const redirectUrl = `http://localhost:3000/r/${config.clientId}`;
QRCode.toFile(path.join(outDir, 'qr.png'), redirectUrl, {
    color: { dark: config.primaryColor || '#FF5722', light: '#FFFFFF' },
    width: 500
}, (err) => {
    if (err) throw err;
    console.log(`[BUILD SUCCESS] Compiled Hub, Menu, Booking & Inquiry for ${config.clientId}`);
});
