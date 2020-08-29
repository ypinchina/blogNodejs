var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')
/* GET users listing. */
router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  // let isAdmin = req.query.isAdmin || ''
  // if(isAdmin) {
  //     let loginCheckResult = loginCheck(req)
  //     if (loginCheckResult) {
  //         //有结果 没有登录
  //         return loginCheckResult/** 这句话相当于返回这个 return Promise.resolve(
  //                                         new ErrorModel('尚未登录')) 不会往下执行了 */
  //     }
  //     author = req.session.username
  // }
  let result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })

})

router.get('/detail', function(req, res, next) {
    res.json({
        arr: [1, 2, 3],
        errno: 0
    })
  })
module.exports = router
