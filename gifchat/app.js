const express = require('express')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks')
const connect = require('./schemas')
const ColorHash = require('color-hash').default
const dotenv = require('dotenv')
dotenv.config();

const webSocket = require('./socket');
const app = express();

app.set('port', process.env.PORT || 8005);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/gif', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
})
app.use(sessionMiddleware)
app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHash = new ColorHash()
    req.session.color = colorHash.hex(req.sessionID)
  }
  next()
})


const indexRouter = require('./routes')
app.use('/', indexRouter);

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

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

webSocket(server, app, sessionMiddleware)