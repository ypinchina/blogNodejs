const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    let method = req.method
    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''
        let result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        let id = req.query.id
        let detailResult = getDetail(id)
        return detailResult.then(data => {
            return new SuccessModel(data)
        })
    }
    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        //因为目前没有做登录 所以body里面的author需要用假数据自行添加
        req.body.author = 'ypinchina'
        let newResult = newBlog(req.body)
        return newResult.then(newBlogPostData => {
            return new SuccessModel(newBlogPostData)
        })
    }
    //更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        let updateResult = updateBlog(req.query.id, req.body) //返回的result是个boolean
        return updateResult.then(result => {
            if(result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    //删除博客的接口
    if(method === 'POST' && req.path === '/api/blog/delete') {
        let deleteResult = deleteBlog(req.query.id, 'lisi')
        return deleteResult.then(result => {
            if(result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter