const express = require('express')
const app = express()
app.use((req, res, next) =>{
    console.log('start', req.method, req.url)
    next()
})
app.use((req, res, next) => {
    req.cookie = {
        usename: 'zhangsan'
    }
    console.log('处理cookie')
    next()
})
app.use('/api', (req, res, next) => {
    //处理异步 postdata
    setTimeout(() => {
        req.body = {
            username:'qeqeq',
            password:1232131
        }
        next()
    })
    console.log('处理异步')
})
app.use('/api',(req, res, next) => {
    console.log('post /api 路由')
    next()
})
function loginCheck(req, res, next) {
    setTimeout(() =>{
        res.json({
            errno: 0,
            message: 'password is error'
        })
        console.log('模拟登陆失败')
        // console.log('模拟登陆成功')
        // next()
    })
}
app.get('/api/set-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/set-cookie')
    res.json({
        errno:0,
        data: req.cookie
    })
})
app.post('/api/get-postdata',(req, res, next) => {
    console.log('post /api/get-postdata')
    res.json({
        errno:0,
        data: req.body
    })
})
//处理404
app.use((req, res, next) => {
    res.json({message: '404 not found!'})
})

app.listen(3002, ()=>{
    console.log('server is running on port 3002!')
})