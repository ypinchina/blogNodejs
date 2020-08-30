const router = require('koa-router')()

router.prefix('/api/user')
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', async function(ctx, next) {
  const { username, password } = ctx.request.body
  ctx.session.username = username
  let result = await login(username, password)
  if(result && result.username) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('账号或密码错误，登录失败')
  }
})
// router.get('/session-text', async function (ctx, next) {
//   if(ctx.session.viewNum === null) {
//     ctx.session.viewNum = 0
//   }
//   ctx.session.viewNum++
//   ctx.body = {
//     viewNum: ctx.session.viewNum
//   }
// })

module.exports = router
