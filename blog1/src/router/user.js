const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    let method = req.method
    let username = req.body.username//登录账号
    let password = req.body.password//登录密码
    //登录
    if (method === 'POST' && req.path === '/api/user/login') {
        let loginResult = loginCheck(username, password)
        return loginResult.then(res => {
            if(res) {
                return new SuccessModel()
            } else {
                return new ErrorModel('账号或密码错误，登录失败')
            }
        })
    }
}

module.exports = handleUserRouter