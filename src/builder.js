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

// 1. Process Main Index Hub
let indexTemplate = fs.readFileSync(path.join(__dirname, '../templates/index.html'), 'utf8');
indexTemplate = indexTemplate
    .replace(/{{HOTEL_NAME}}/g, config.hotelName)
    .replace(/{{TAGLINE}}/g, config.tagline)
    .replace(/{{PRIMARY_COLOR}}/g, config.primaryColor)
    .replace(/{{LOGO_URL}}/g, config.logoUrl)
    .replace(/{{MENU_URL}}/g, './menu.html')
    .replace(/{{TABLE_URL}}/g, './booking.html')
    .replace(/{{ROOM_URL}}/g, './booking.html');

fs.writeFileSync(path.join(outDir, 'index.html'), indexTemplate);

// 2. Process Menu Page
let menuTemplate = fs.readFileSync(path.join(__dirname, '../templates/menu.html'), 'utf8');
menuTemplate = menuTemplate
    .replace(/{{HOTEL_NAME}}/g, config.hotelName)
    .replace(/{{PRIMARY_COLOR}}/g, config.primaryColor)
    .replace(/{{ADMIN_PHONE}}/g, config.adminPhone || '256700000000');

fs.writeFileSync(path.join(outDir, 'menu.html'), menuTemplate);

// 3. Process Booking Page
let bookingTemplate = fs.readFileSync(path.join(__dirname, '../templates/booking.html'), 'utf8');
bookingTemplate = bookingTemplate
    .replace(/{{HOTEL_NAME}}/g, config.hotelName)
    .replace(/{{PRIMARY_COLOR}}/g, config.primaryColor)
    .replace(/{{ADMIN_PHONE}}/g, config.adminPhone || '256700000000');

fs.writeFileSync(path.join(outDir, 'booking.html'), bookingTemplate);

// 4. Generate QR Code
const redirectUrl = `http://localhost:3000/r/${config.clientId}`;
QRCode.toFile(path.join(outDir, 'qr.png'), redirectUrl, {
    color: { dark: config.primaryColor, light: '#FFFFFF' },
    width: 500
}, (err) => {
    if (err) throw err;
    console.log(`[BUILD SUCCESS] Compiled Hub, Menu & Booking for ${config.clientId}`);
});
