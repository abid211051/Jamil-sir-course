const server = require("http").createServer((req, res) => {
  req.on("data", (chunk) => res.write(chunk.toString("utf8").toUpperCase()))
  req.on("end", ()=>res.end())
});
server.listen(process.argv[2]);
