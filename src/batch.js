const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const clientsDir = path.join(__dirname, '../clients');

if (!fs.existsSync(clientsDir)) {
    console.error('[ERROR] Clients directory not found.');
    process.exit(1);
}

const files = fs.readdirSync(clientsDir).filter(file => file.endsWith('.json'));

if (files.length === 0) {
    console.log('[INFO] No JSON configuration files found in clients/ directory.');
    process.exit(0);
}

console.log(`\n========================================`);
console.log(` Starting Batch Build for ${files.length} Client(s)`);
console.log(`========================================\n`);

let successCount = 0;
let failCount = 0;

files.forEach(file => {
    const configPath = path.join('clients', file);
    try {
        console.log(`[BUILDING] Processing configuration: ${file}...`);
        execSync(`node src/builder.js ${configPath}`, { stdio: 'inherit' });
        successCount++;
    } catch (err) {
        console.error(`[FAILED] Error processing ${file}`);
        failCount++;
    }
});

console.log(`========================================`);
console.log(` Batch Build Summary:`);
console.log(` - Successfully Built: ${successCount}`);
console.log(` - Failed:             ${failCount}`);
console.log(`========================================\n`);
