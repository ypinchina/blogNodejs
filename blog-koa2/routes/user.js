const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.body
  ctx.body = {
      errno: 0,
      username,
      password
  }
})

router.get('/session-text', async function (ctx, next) {
  if(ctx.session.viewNum === null) {
    ctx.session.viewNum = 0
  }
  ctx.session.viewNum++
  ctx.body = {
    viewNum: ctx.session.viewNum
  }
})

module.exports = router
