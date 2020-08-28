var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.send({
      'say': 'hello world',
      'num': 123
  });
});

router.get('/detail', function(req, res, next) {
    res.json({
        arr: [1, 2, 3],
        errno: 0
    });
  });
module.exports = router;
