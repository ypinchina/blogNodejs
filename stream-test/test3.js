const fs = require('fs')
const http = require('http')
const path = require('path')
const afile = path.resolve(__dirname, 'a.txt')
const readStream = fs.createReadStream(afile)
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        readStream.pipe(res)
    }
})
server.listen(5001)