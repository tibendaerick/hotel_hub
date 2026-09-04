const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    const { clientId } = req.query;
    
    if (!clientId) {
        return res.status(400).send('Client ID is required');
    }

    // Redirect dynamic QR scan directly to the client's landing hub
    res.redirect(302, `/h/${clientId}/index.html`);
};
