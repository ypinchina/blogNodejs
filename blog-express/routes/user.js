var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  res.send({
      error: 0,
      data: {
          username,
          password
      }
  });
});
router.get('/session-test', function(req, res, next){
  const session = req.session
  if(session.loginNum === null) {
    session.loginNum = 0
  }
  session.loginNum++
  res.json({
    loginNum: session.loginNum
  })
})
module.exports = router;
