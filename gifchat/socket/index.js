const SocketIO = require('socket.io')

module.exports = (server) => {
  const io = SocketIO(server, { path: '/socket.io' });

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log('새로운 클라이언트 접속', ip, socket.id, req.ip)
    socket.on('reply', (message) => {
      console.log(message)
    })
    socket.on('error', console.error)
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 종료', ip, socket.id)
      clearInterval(socket.interval)
    })
    socket.interval = setInterval(() => {
      socket.emit('news', '서버에서 클라이언트에게 고한다.')
    }, 3000)
  })
}