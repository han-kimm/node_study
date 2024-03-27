const express = require('express')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const { sequelize } = require('./models/index.js');
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
dotenv.config();

const app = express();

const passport = require('passport');
const passportconfig = require('./passport')
passportconfig();

sequelize.sync({ force: true })
  .then(() => {
    console.log('DB 연결 성공')
  })
  .catch((e) => {
    console.error(e)
  })

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
}))
app.use(passport.initialize())
app.use(passport.session())

const pageRouter = require('./routes/page.js')
const authRouter = require('./routes/auth.js')
app.use('/', pageRouter);
app.use('/auth', authRouter)

app.use((req, res, next) => {
  //404 Error
  const error = new Error(`${req.method} ${req.url} 해당하는 주소가 없습니다.`)
  error.status = 404;
  next(error)
})
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});