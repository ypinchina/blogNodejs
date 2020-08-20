const { getList } = require('../controller/blog')
const { SusscessModel, ErrorModer } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    let method = req.method
    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''
        let listData = getList(author, keyword)
        return new SusscessModel(listData)
    }
    if(method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: '这是获取博客详情的接口'
        }
    }
    if(method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }
    if(method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: '这是新建博客的接口'
        }
    }
    if(method === 'POST' && req.path === '/api/blog/delete') {
        return {
            msg: '这是删除博客的接口'
        }
    }
}
module.exports = handleBlogRouter