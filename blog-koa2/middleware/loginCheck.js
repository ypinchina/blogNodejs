//登录检查的中间件
const { ErrorModel } = require('../model/resModel')
const { json } = require('express')
const loginCheck = (req, res, next) =>{
    if(req.session.username) {
        next()
        return
    } else {
        res.json(new ErrorModel('未登录'))
    }
}
module.exports = loginCheck