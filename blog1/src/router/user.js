const handleUserRouter = (req, res) => {
    let method = req.method
    //登录
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: '这是用户登录的接口'
        }
    }
}

module.exports = handleUserRouter