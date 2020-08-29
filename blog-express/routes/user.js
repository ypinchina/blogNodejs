var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  req.session.username = username
  let loginResult = login(username, password)
  return loginResult.then(result => {
    if(result && result.username) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('账号或密码错误，登录失败'))
    }
  })
})
router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json({
      errno: 0,
      message: '已登录'
    })
  } else {
    res.json({
      errno: -1,
      message: '未登录'
    })
  }
})
// router.get('/session-test', function(req, res, next){
//   const session = req.session
//   if(session.loginNum === null) {
//     session.loginNum = 0
//   }
//   session.loginNum++
//   res.json({
//     loginNum: session.loginNum
//   })
// })
module.exports = router;
