const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    let method = req.method
    //登录
    if (method === 'GET' && req.path === '/api/user/login') {
        // let { username, password } = req.body
        let { username, password } = req.query
        req.session.username = username
        let loginResult = login(username, password)
        return loginResult.then(result => {
            if(result && result.username) {
                return new SuccessModel()
            } else {
                return new ErrorModel('账号或密码错误，登录失败')
            }
        })
    }
    //判断用户是否有登录  登录校验的测试接口
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if(req.cookieObj.userId) {
            return Promise.resolve(
                new SuccessModel()
            )
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handleUserRouter