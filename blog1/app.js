let querystring = require('querystring')
let blogRouter = require('./src/router/blog')
let userRouter = require('./src/router/user')

let serverHandle = (req, res) => {
    //获取path
    let url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[0])
    res.setHeader('Content-type', 'application/json')
    let blogData = blogRouter(req, res)
    if(blogData) {
        res.end(JSON.stringify(blogData))
        return
    }
    let userDatat = userRouter(req, res)
    if(userDatat) {
        res.end(JSON.stringify(userDatat))
        return
    }
    //如果未命中 404
    res.writeHeader(404, {'Content-type': 'text/plain'})
    res.write('404 Not find\n')
    res.end()
}
module.exports = serverHandle