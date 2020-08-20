const http = require('http')
const PORT = 3000
let httpServerHandle = require('../app')
const server = http.createServer(httpServerHandle)
server.listen(PORT)