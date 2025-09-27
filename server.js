const http=require('http');
const fs = require('fs');
const path = require('path');
const PORT=3000;

const server=http.createServer((req,res)=>{
    let filePath = '';
    if(req.url=='/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        // res.write('<h1>This is home page</h1>');
        filePath = path.join(__dirname, 'public', 'home.html');
        res.end();
    }
    else if(req.url=='/about'){
        res.writeHead(200,{'Content-Type':'text/html'});
        // res.write('<h1>This is about page</h1>');
        filePath = path.join(__dirname, 'public', 'about.html');
        res.end();
    }
    else if(req.url=='/contact'){
        res.writeHead(200,{'Content-Type':'text/html'});
        // res.write('<h1>This is contact page</h1>');
        filePath = path.join(__dirname, 'public', 'contact.html');
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        // res.write('<h1>404 Page Not Found</h1>');
        filePath = path.join(__dirname, 'public', '404.html');
        res.end();
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});
// const server = http.createServer((req, res) => {

    
// });

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});