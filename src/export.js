const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const exportsDir = path.join(__dirname, '../exports');
const distDir = path.join(__dirname, '../dist/h');

if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
}

if (!fs.existsSync(distDir)) {
    console.error('[ERROR] No compiled dist directory found. Run "npm run build:all" first.');
    process.exit(1);
}

const clients = fs.readdirSync(distDir).filter(file => {
    return fs.statSync(path.join(distDir, file)).isDirectory();
});

if (clients.length === 0) {
    console.log('[INFO] No client build folders found to export.');
    process.exit(0);
}

console.log(`\n========================================`);
console.log(` Packaging ${clients.length} Client Bundle(s)`);
console.log(`========================================\n`);

clients.forEach(clientId => {
    const clientDistPath = path.join(distDir, clientId);
    const zipFileName = `${clientId}_package.zip`;
    const zipFilePath = path.join(exportsDir, zipFileName);

    try {
        if (fs.existsSync(zipFilePath)) {
            fs.unlinkSync(zipFilePath);
        }

        console.log(`[PACKAGING] Bundling assets for: ${clientId}...`);
        execSync(`cd ${clientDistPath} && zip -r ${zipFilePath} ./*`, { stdio: 'ignore' });
        console.log(`[SUCCESS] Package generated: exports/${zipFileName}`);
    } catch (err) {
        console.error(`[FAILED] Could not package ${clientId}:`, err.message);
    }
});

console.log(`\n========================================`);
console.log(` Export Process Complete!`);
console.log(` Packages saved in: /exports`);
console.log(`========================================\n`);
