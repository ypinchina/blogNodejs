const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    let id = req.query.id
    // 处理blog路由的接口
    const loginCheck = () => {
        //判断是否用户是否有登录的方法
        if(!req.session.username) {
            //没有登录
            return Promise.resolve(
                new ErrorModel('尚未登录')
            )
        }//如果登录返回undefined
    }
    let method = req.method
    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''
        let isAdmin = req.query.isAdmin || ''
        if(isAdmin) {
            let loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                //有结果 没有登录
                return loginCheckResult/** 这句话相当于返回这个 return Promise.resolve(
                                                new ErrorModel('尚未登录')) 不会往下执行了 */
            }
            author = req.session.username
        }
        let result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        let detailResult = getDetail(id)
        return detailResult.then(data => {
            return new SuccessModel(data)
        })
    }
    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        let loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //有结果 没有登录
            return loginCheckResult/** 这句话相当于返回这个 return Promise.resolve(
                                            new ErrorModel('尚未登录')) 不会往下执行了 */
        }
        //因为目前没有做登录 所以body里面的author需要用假数据自行添加
        req.body.author = req.session.username
        let newResult = newBlog(req.body)
        return newResult.then(newBlogPostData => {
            return new SuccessModel(newBlogPostData)
        })
    }
    //更新一篇博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        let loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //有结果 没有登录
            return loginCheckResult/** 这句话相当于返回这个 return Promise.resolve(
                                            new ErrorModel('尚未登录')) 不会往下执行了 */
        }
        let updateResult = updateBlog(id, req.body) //返回的result是个boolean
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
        let loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //有结果 没有登录
            return loginCheckResult/** 这句话相当于返回这个 return Promise.resolve(
                                            new ErrorModel('尚未登录')) 不会往下执行了 */
        }
        let deleteResult = deleteBlog(id, req.session.username)
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