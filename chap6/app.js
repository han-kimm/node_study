const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
  console.log('Everything Everywhere All at Once')
  next();
  // next(error) 메서드에 인수가 있으면 에러처리가 됨
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))

  // res.json({name : "it's me"})
  // json, send, end 한번에 여러개 보내면 에러
})

app.get('/info/:data', (req, res) => {
  const { data } = req.params
  res.send(`what about you, ${data}`)
})

app.use((req, res, next) => {
  res.send('404 Not Found')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.send("에러가 발생했습니다.")
  next()
})

app.listen(3000, () => {
  console.log('3000번 포트에서 서버 대기 중...')
})