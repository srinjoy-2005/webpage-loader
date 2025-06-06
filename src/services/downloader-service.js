const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function fetchHTML(url) {
    try {
        const response = await axios.get(url); // Make a GET request to the URL
        return response.data; // Return the HTML content
    } catch (error) {
        console.error(`Error fetching HTML from ${url}:`, error.message);
        throw error; // Rethrow the error for handling later
    }
}

// (async () => {
//     try {
//         const html = await fetchHTML('https://google.com'); // Await the result of fetchHTML
//         console.log(html); // Log the HTML content
//     } catch (error) {
//         console.error(error); // Handle any errors
//     }
// })
// ()//immediately invoke the async function
// ;

module.exports = {fetchHTML}; 