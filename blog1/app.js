let querystring = require('querystring')
let blogRouter = require('./src/router/blog')
let userRouter = require('./src/router/user')
let { redisGet, redisSet } = require('./src/database/redis')
const cookieExpires = () => {
    let time = new Date()
    time.setTime(time.getTime() + 24 * 60 * 60 * 1000)//一天后的毫秒数
    return time.toGMTString()
}
// let SESSION_DATA = {}//暂存的session对象

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

    //获取cookies并解析
    let cookieStr = req.headers.cookie || ''//k1=k1;v1=v1;v2=v2
    req.cookieObj = {}
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        let key = item.split('=')
        req.cookieObj[key[0].trim()] = key[1].trim()
        //trim()方法用于除去 cookie key-value的空格 保证唯一性
    })

    //解析session
    let needSetCookie = false //判断是否需要设置cookie
    let userId = req.cookieObj.userId
    if(!userId) {
        //没有userId
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        redisSet(userId, {})
    }                              
    req.sessionId = userId
    // 获取session
    redisGet(req.sessionId).then(res => {
        if(!res) {//res为null
        // redis中没有这个userId对于的session username
          //保存到redis里 session为空
          redisSet(req.sessionId, {})
          req.session = {}
        } else {
          req.session = res
        }
        return postDateHandle(req)
    }).then((postData)=> {
        //处理postData
        req.body = postData
        
        //获取博客接口数据的路由
        let blogResult = blogRouter(req, res)//返回一个promise对象
        if(blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${cookieExpires()}`)
                }
                if(blogData) {
                    res.end(JSON.stringify(blogData))
                }                
            })
            return
        }//如果没有返回 证明没有登录

        //获取用户登录信息的路由
        let userData = userRouter(req, res)
        if(userData) {
            userData.then(data => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${cookieExpires()}`)
                }
                if(data) {
                    res.end(JSON.stringify(data))
                }
            })
            return
        }
        //如果未命中 404
        res.writeHeader(404, {'Content-type': 'text/plain'})
        res.write('404 Not find\n')
        res.end()
    })
}
module.exports = serverHandle