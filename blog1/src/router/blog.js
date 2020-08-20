const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    let method = req.method
    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''
        let listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        let id = req.query.id
        let detailDate = getDetail(id)
        return new SuccessModel(detailDate)
    }
    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        let newBlogPostData = newBlog(req.body)
        return new SuccessModel(newBlogPostData)
    }
    //更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        let result = updateBlog(req.query.id, req.body) //返回的result是个boolean
        if(result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新失败')
        }
    }
    //删除博客的接口
    if(method === 'POST' && req.path === '/api/blog/delete') {
        let result = deleteBlog(req.query.id)
        if(result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }
}
module.exports = handleBlogRouter