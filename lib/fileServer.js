// Helper module: asynchronous file serving with MIME handling
const fs = require('fs').promises;
const path = require('path');


const mime = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};


async function serveFile(res, filePath, statusCode = 200) {
    try {
        // If the path points to a directory, serve index.html inside it
        const stat = await fs.stat(filePath);
        let finalPath = filePath;
        if (stat.isDirectory()) {
        finalPath = path.join(filePath, 'index.html');
    }


    const data = await fs.readFile(finalPath);
    const ext = path.extname(finalPath).toLowerCase();
    const contentType = mime[ext] || 'application/octet-stream';


    // Send response with appropriate status code and content-type
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
    } 
    catch (err) {
        // Re-throw the error so caller can decide how to handle (404 vs 500)
        throw err;
    }
}


module.exports = { serveFile };