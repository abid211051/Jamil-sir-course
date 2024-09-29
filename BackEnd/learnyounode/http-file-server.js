const server = require("http").createServer((req, res)=>{
    res.writeHead(200, { 'content-type': 'text/plain' })
    require("fs").createReadStream(process.argv[3]).pipe(res);
})
server.listen(process.argv[2]);