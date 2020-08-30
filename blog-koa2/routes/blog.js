const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    let keyword = ctx.query.keyword || ''
    let isAdmin = ctx.query.isAdmin || ''
    if(isAdmin) {
      if(!ctx.session.username){
        ctx.body = new ErrorModel('未登陆')
        return
      }
      author = ctx.session.username
    }
    let listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})
//获取博客详情
router.get('/detail', async function(ctx, next) {
    let data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
  })
// 新建一篇博客
router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  let newBlogPostData = await newBlog(body)
  ctx.body = new SuccessModel(newBlogPostData)
})
// 更新一篇博客
router.post('/update', loginCheck, async (ctx, next) => {
  let result = await updateBlog(ctx.query.id, ctx.request.body) //返回的result是个boolean
    if(result) {
      ctx.body = new SuccessModel()
    } else {
      ctx.body = new ErrorModel('更新博客失败')
    }
})
//删除一篇博客 
router.post('/delete', loginCheck, async (ctx, next) => {
  let result = await deleteBlog(ctx.query.id, ctx.session.username)
  if(result) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})
module.exports = router
