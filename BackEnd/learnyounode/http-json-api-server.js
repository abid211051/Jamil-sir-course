const http = require("http");

const server = http.createServer((req, res)=>{
    const url = new URL(`http://localhost:${process.argv[2]}${req.url}`);
    const date =  new Date(url.searchParams.get('iso'));
    const obj = {
        hour : date.getHours(),
        minute : date.getMinutes(),
        second : date.getSeconds()
    }
    res.writeHead(200, {"Content-Type": "application/json"})
    url.pathname === '/api/parsetime'? res.end(JSON.stringify(obj)) :  res.end(JSON.stringify({unixtime: date.getTime()}));
});

server.listen(process.argv[2]);