const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/fetch-pdf', async (req, res) => {
    const trackingId = req.query.trackingid;

    if (!trackingId || trackingId.length !== 15) {
        return res.status(400).json({ error: "Invalid Tracking ID" });
    }

    const apiUrl = `https://api.verxid.site/nimc-world-bank/live/v2/slip2?trackingid=${trackingId}&center_username=kdkadsrimamhmmdbhrwyerc&center_pass=D0x$5zHO`;

    try {
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Disposition', `attachment; filename="${trackingId}.pdf"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch PDF. Check Tracking ID." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});