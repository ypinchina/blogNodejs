const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redis = require('koa-redis')
var morgan = require('koa-morgan')//写日志引入morgan模块


// const index = require('./routes/index')
// const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger 控制台直接打印
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 写日志
const _ENV = process.env.NODE_ENV
const path = require('path')
const fs = require('fs')
const fileName = path.join(__dirname, 'logs', 'access.log')
const writeStream = fs.createWriteStream(fileName, {
  flags: 'a'
})
if(_ENV === 'production') {
  //生产环境 日志写入文件
  app.use(morgan('combined', {
    stream: writeStream
  }//默认项是直接输出在控制台
  ));
} else {
  //开发环境 日志直接控制台输出
  app.use(morgan('dev'));
}


const { REDIS_CONFIG } = require('./conf/db')
//session与redis配置
app.keys = ['@_)a1q6SxT0']
app.use(session({
  cookie: {
    path: '/',
    httpOnly: 'true',
    maxAge: 24 * 60 * 60 * 1000    
  },
  store: redis({
    all: `${REDIS_CONFIG.host}: ${REDIS_CONFIG.port}`
  })
}))

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
