// 标准输入输出 linux
//process.stdin.pipe(process.stdout) //输入什么就输出什么 std  standard

const http = require('http')
const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        req.pipe(res)
    }
})
server.listen(5000)