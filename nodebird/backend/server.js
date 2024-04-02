const express = require('express')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet')
const hpp = require('hpp')
const session = require('express-session');
const { sequelize } = require('./models/index.js');
const { createClient } = require('redis')
const RedisStore = require('connect-redis').default
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}`,
  password: process.env.REDIS_PW,
  legacyMode: false
})
redisClient.connect().catch(console.error)

const isProd = process.env.NODE_ENV === 'production'

const app = express();

const passport = require('passport');
const passportconfig = require('./passport')
passportconfig();

sequelize.sync({ force: false })
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

app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  },
  store: new RedisStore({ client: redisClient })
}
if (isProd) {
  app.enable('trust proxy')
  sessionOption.proxy = true;
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(hpp())
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'));
}

app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())

const pageRouter = require('./routes/page.js')
const authRouter = require('./routes/auth.js')
const postRouter = require('./routes/post.js')
const userRouter = require('./routes/user.js')
app.use('/', pageRouter);
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)

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

module.exports = app