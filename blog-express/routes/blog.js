var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck');
const { json } = require('express');
/* GET users listing. */
router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  let isAdmin = req.query.isAdmin || ''
  if(isAdmin) {
    if(!req.session.username){
      res.json(new ErrorModel('未登陆')) 
      return
    }
    author = req.session.username
  }
  let result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
})
//获取博客详情
router.get('/detail', function(req, res, next) {
    let detailResult = getDetail(req.query.id)
    return detailResult.then(data => {
        res.json(new SuccessModel(data))
    })
  })
// 新建一篇博客
router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  let newResult = newBlog(req.body)
  return newResult.then(newBlogPostData => {
      res.json(new SuccessModel(newBlogPostData))
  })
})
// 更新一篇博客
router.post('/update', loginCheck, (req, res, next) => {
  let updateResult = updateBlog(req.query.id, req.body) //返回的result是个boolean
  return updateResult.then(result => {
      if(result) {
        res.json(new SuccessModel())
      } else {
        res.json(new ErrorModel('更新博客失败'))
      }
  })
})
//删除一篇博客 
router.post('/delete', loginCheck, (req, res, next) => {
  let deleteResult = deleteBlog(req.query.id, req.session.username)
  return deleteResult.then(result => {
    if(result) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
})
module.exports = router
