var createError = require('http-errors');// 与下方404报错连起来用
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//对应解析cookies的库
var logger = require('morgan');//写日志
var session = require('express-session')
var redisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user')

var app = express();

//前端express自带的视图
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
var redisClient = require('./db/redis')
var sessionStore = new redisStore({
  client: redisClient
})
// 写日志
const _ENV = process.env.NODE_ENV
const fs = require('fs')
const fileName = path.join(__dirname, 'logs', 'access.log')
const writeStream = fs.createWriteStream(fileName, {
  flags: 'a'
})
if(_ENV === 'production') {
  //生产环境 日志写入文件
  app.use(logger('combined', {
    stream: writeStream
  }//默认项是直接输出在控制台
  ));
} else {
  //开发环境 日志直接控制台输出
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'&%@_5qG7sZcw1',
  cookies: {
    path:'/',//默认配置
    httpOnly: true,//默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))
// app.use(express.static(path.join(__dirname, 'public')));//设置静态文件

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog',  blogRouter);
app.use('/api/user',  userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
