const fs = require('fs').promises;
const path = require('path');
const { fetchHTML } = require('../services/downloader-service');
const { URL } = require('url');

async function saveCommand(url) {
    try {
        // Validate and enforce HTTPS
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }
        const parsedUrl = new URL(url); // Throws an error if the URL is invalid

        const html = await fetchHTML(url);

        // Extract hostname and use it as part of the filename
        const hostname = parsedUrl.hostname.split('.')[0]; // Get the first part of the hostname

        const now = new Date();
        const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
        const filePath = path.join(__dirname, '../../downloads/', `${hostname}-${timestamp}.html`);

        // Ensure the downloads directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // Write the HTML content to the file
        await fs.writeFile(filePath, html, 'utf-8');
        console.log(`HTML content saved to ${filePath}`);
    } catch (error) {
        console.error(`Error saving HTML: ${error.message}`);
    }
}

module.exports = { saveCommand };