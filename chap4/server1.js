const http = require('http')
const fs = require('fs').promises

const user = {};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': "text/html, charset=utf-8" })
        const data = await fs.readFile('./server1.html');
        res.end(data);
      } else if (req.url === "/write") {
        res.writeHead(200, { 'Content-Type': "text/html, charset=utf-8" })
        const data = await fs.readFile('./server1_write.html');
        res.end(data);
      } else if (req.url === "/user") {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(user));
      } else {
        console.log('파일')
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        const data = await fs.readFile(`.${req.url}`)
        res.end(data)
      }
    } else if (req.method === "POST") {
      if (req.url === "/user") {
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          user.name = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }
    }
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