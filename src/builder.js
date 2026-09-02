const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

function buildClientHub(configPath) {
    const fullConfigPath = path.resolve(configPath);
    if (!fs.existsSync(fullConfigPath)) {
        console.error(`[ERROR] Configuration file missing: ${fullConfigPath}`);
        process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(fullConfigPath, 'utf8'));
    const templatePath = path.join(__dirname, '../templates/index.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    // WhatsApp Fallback Logic for missing web links
    const defaultPhone = config.contact_phone || '256000000000';
    const menuTarget = config.links.menu || `https://wa.me/${defaultPhone}?text=Hello,%20I%20would%20like%20to%20view%20the%20Food%20%26%20Drink%20menu.`;
    const tableTarget = config.links.table || `https://wa.me/${defaultPhone}?text=Hello,%20I%20would%20like%20to%20reserve%20a%20table.`;
    const roomTarget = config.links.room || `https://wa.me/${defaultPhone}?text=Hello,%20I%20would%20like%20to%20inquire%20about%20room%20availability.`;

    // Hydrate Template
    template = template.replace(/{{HOTEL_NAME}}/g, config.hotel_name)
                       .replace(/{{TAGLINE}}/g, config.tagline || 'Welcome! Select a service below')
                       .replace(/{{LOGO_URL}}/g, config.logo_url || 'https://via.placeholder.com/150')
                       .replace(/{{MENU_URL}}/g, menuTarget)
                       .replace(/{{TABLE_URL}}/g, tableTarget)
                       .replace(/{{ROOM_URL}}/g, roomTarget);

    template = template.replace('<body>', `<body style="--primary: ${config.primary_color || '#2563EB'};">`);

    // Output Directory Preparation
    const outputDirectory = path.join(__dirname, '../dist/h', config.client_id);
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // Write Hydrated Output HTML
    fs.writeFileSync(path.join(outputDirectory, 'index.html'), template);

    // Dynamic Target Redirect Route
    const targetRedirectUrl = `${config.base_domain}/h/${config.client_id}`;
    const qrOutputPath = path.join(outputDirectory, 'qrcode.png');

    QRCode.toFile(qrOutputPath, targetRedirectUrl, {
        color: {
            dark: config.primary_color || '#000000',
            light: '#FFFFFF'
        },
        width: 800,
        margin: 2
    }, (err) => {
        if (err) {
            console.error(`[ERROR] Failed to generate QR code for ${config.client_id}:`, err);
            return;
        }
        console.log(`\n----------------------------------------`);
        console.log(`[SUCCESS] Assets built for: ${config.hotel_name}`);
        console.log(`Landing Output: ./dist/h/${config.client_id}/index.html`);
        console.log(`Print QR Code:  ./dist/h/${config.client_id}/qrcode.png`);
        console.log(`Dynamic Route:  ${targetRedirectUrl}`);
        console.log(`----------------------------------------\n`);
    });
}

const targetConfigArgument = process.argv[2];
if (!targetConfigArgument) {
    console.error('[ERROR] Please specify a config path. Example: node src/builder.js clients/sample.json');
    process.exit(1);
}

buildClientHub(targetConfigArgument);
