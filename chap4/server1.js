const http = require('http')
const fs = require('fs').promises

const server = http.createServer(async (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': "text/html, charset=utf-8" })
    const data = await fs.readFile('./server1.html');
    res.end(data);
  } catch (e) {
    console.error(e)
    res.writeHead(200, { 'Content-Type': "text/html, charset=utf-8" })
    res.end(e.message)
  }
})
  .listen(8080)
server.on("listening", () => {
  console.log("8080번 서버 시작")
})
server.on("error", (err) => {
  console.error(err)
})