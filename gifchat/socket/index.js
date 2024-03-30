const SocketIO = require('socket.io');
const { removeRoom } = require('../services');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io)
  const room = io.of('/room')
  const chat = io.of('/chat')
  const wrap = middle => (socket, next) => middle(socket.request, {}, next)
  chat.use(wrap(sessionMiddleware))

  room.on('connection', (socket) => {
    console.log('room 네임스페이스')
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 해제')
    })
  })

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스')

    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId);
    socket.to(roomId).emit('join', {
      user: 'system',
      guest: socket.request.session.color,
      chat: `${socket.request.session.color}님이 입장하셨습니다.`
    })
    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 해제')
      const currentRoom = chat.adapter.rooms.get(roomId)
      console.log('currentRoom', currentRoom)
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        await removeRoom(roomId);
        room.emit('removeRoom', roomId);
        console.log(`${roomId} 방이 삭제되었습니다.`)
      }
      socket.to(roomId).emit('exit', {
        user: 'system',
        guest: socket.request.session.color,
        chat: `${socket.request.session.color}님이 퇴장하셨습니다.`
      })
    })
  })
}