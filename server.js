// Main server file — uses Node's http module and the modular file server
const http = require('http');
const path = require('path');
const { serveFile } = require('./lib/fileServer');


const PORT = process.env.PORT || 3000;


const server = http.createServer(async (req, res) => {
// Use URL to safely parse the request path
const url = new URL(req.url, `http://${req.headers.host}`);
const pathname = url.pathname;


    try {
        // Route: home (also treat / as /home)
        if (pathname === '/' || pathname === '/home') {
            await serveFile(res, path.join(__dirname, 'public', 'home.html'), 200);
            return;
        }


        // Route: about
        if (pathname === '/about') {
            await serveFile(res, path.join(__dirname, 'public', 'about.html'), 200);
            return;
        }


        // Route: contact
        if (pathname === '/contact') {
            await serveFile(res, path.join(__dirname, 'public', 'contact.html'), 200);
            return;
        }


        // Attempt to serve any static file from /public (e.g., /styles.css)
        const safePath = path.join(__dirname, 'public', pathname);
        const publicRoot = path.join(__dirname, 'public');


        // Prevent path traversal: ensure requested file stays inside public root
        if (!safePath.startsWith(publicRoot)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 - Bad Request');
            return;
        }


        // Try serving the static file; if missing, fall through to 404
        try {
            await serveFile(res, safePath, 200);
            return;
        } 
        catch (err) {
            // File not found — serve custom 404
            await serveFile(res, path.join(__dirname, 'public', '404.html'), 404);
            return;
        }
    } 
    catch (err) {
        console.error('Unhandled server error:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
    }
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});