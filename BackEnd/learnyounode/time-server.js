const net = require("net");

const server = net.createServer((socket) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const fulldate = `${year}-${month}-${day} ${hours}:${minutes}`;

  socket.write(`${fulldate}\n`);
  socket.end();
});

server.listen(process.argv[2]);
