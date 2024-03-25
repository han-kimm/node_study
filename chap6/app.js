const express = require('express');
const path = require('path');

const app = express();

const router = express.Router()

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
  console.log('Everything Everywhere All at Once')
  next();
  // next(error) 메서드에 인수가 있으면 에러처리가 됨
})

app.get('/', (req, res, next) => {
  console.log(2)
  next('router')
  // res.json({ name: "it's me" })
  // json, send, end 한번에 여러개 보내면 에러

  // next('route')
  // next('route') 면 다음 미들웨어가 아니라 다음 라우트로 넘어감
}, (req, res, next) => {
  console.log(3)
  // res.send('라우터')
  next()
})

app.get('/', (req, res, next) => {
  console.log(4)
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/', router)

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))

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