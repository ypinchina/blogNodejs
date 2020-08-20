//get 请求
/*const http = require('http')
const querystring = require('querystring')
let server = http.createServer((req, res) => {
    console.log('method', req.method)
    let url = req.url
    console.log('url', url)
    req.query = querystring.parse(url.split('?')[1]) //.parse nodejs里字符串转对象
    console.log(req.query)
    res.end(JSON.stringify(req.query))
})
server.listen('3000')
*/

//post请求
// let http = require('http')
// let server = http.createServer((req, res)=>{
//     console.log('req content-type', req.headers['content-type'])
//     if(req.method === 'POST') {
//         let postData = ''
//         req.on('data', chunk => {
//             postData += chunk.toString()
//         })
//         req.on('end', () => {
//             console.log('postData', postData)
//         })
//         res.end('post end')
//     }
// })
// server.listen('3000')

let http = require('http')
let querystring = require('querystring')
let server = http.createServer((req, res) => {
    let method = req.method
    let url = req.url
    let path = url.split('?')[1]
    let query = querystring.parse(path)

    res.setHeader('Contype-type', 'application/json')
    // 返回的数据
    let resDate = {
        method,
        url,
        query,
        path
    }
    //返回
    if (method === 'GET') {
        res.end(JSON.stringify(resDate))
    }
    if (method === 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resDate.postData = postData
            res.end(JSON.stringify(resDate))
        })
    }
})
server.listen('3000')