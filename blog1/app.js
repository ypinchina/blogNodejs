let querystring = require('querystring')
let blogRouter = require('./src/router/blog')
let userRouter = require('./src/router/user')

const postDateHandle = (req) => {
    return new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}


let serverHandle = (req, res) => {
    //获取path
    let url = req.url
    req.path = url.split('?')[0]
    //获取 query 即获取url的parm参数
    req.query = querystring.parse(url.split('?')[1])
    res.setHeader('Content-type', 'application/json')

    postDateHandle(req).then((postData)=> {
        //处理postData
        req.body = postData
        
        //获取博客接口数据的路由
        let blogData = blogRouter(req, res)
        if(blogData) {
            res.end(JSON.stringify(blogData))
            return
        }
        //获取用户登录信息的路由
        let userDatat = userRouter(req, res)
        if(userDatat) {
            res.end(JSON.stringify(userDatat))
            return
        }
        //如果未命中 404
        res.writeHeader(404, {'Content-type': 'text/plain'})
        res.write('404 Not find\n')
        res.end()
    })
}
module.exports = serverHandle