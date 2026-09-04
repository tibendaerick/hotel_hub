module.exports = (req, res) => {
    // Get client name from link query or default to hbhotel_hoima
    const clientId = req.query.clientId || 'hbhotel_hoima';
    
    // Redirect directly to the hotel home page
    res.redirect(302, `/h/${clientId}/index.html`);
};
