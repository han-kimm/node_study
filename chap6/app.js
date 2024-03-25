const express = require('express');
const path = require('path');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const fs = require('fs')

const app = express();

const router = express.Router()

app.set('port', process.env.PORT || 3000)

app.use((...params) => {
  morgan('combined')(...params)
})
// 미들웨어를 작성하고 그 안에서 다른 미들웨어를 실행할 수 있음.
// 따라서 조건에 따라 다른 미들웨어를 동적 실행 가능
app.use('/', (...params) => {
  express.static(__dirname, '')(...params)
});
app.use(cookieParser('timeitem'))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'timeitem',
  cookie: {
    httpOnly: true
  },
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// true면 qs라는 외부 라이브러리 사용

app.use((req, res, next) => {
  console.log('Everything Everywhere All at Once')
  next();
  // next(error) 메서드에 인수가 있으면 에러처리가 됨
})

// app.use('/', router)

// router.get('/', (req, res, next) => {
//   console.log(1)
//   next('router');
//   // res.sendFile(path.join(__dirname, 'index.html'))

// })

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/', (req, res, next) => {
  console.log(2)
  next()

  res.cookie('name', "time", {
    expires: new Date(Date.now() + 1000 * 3),
    httpOnly: true,
    path: '/',
    signed: true,
  })
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



app.route('/upload')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'))
  })
  .post(upload.array('image1'), (req, res) => {
    console.log(req.files)
    console.log(req.body)
    res.send('<h1>Saved!</h1><a href="/upload">업로드 또 하기</a>')
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