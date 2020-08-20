const handleUserRouter = (req, res) => {
    let method = req.method
    let url = req.url
    let path = url.split('?')[0]
    //登录
    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: '这是用户登录的接口'
        }
    }
}

module.exports = handleUserRouter