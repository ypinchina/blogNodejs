const http = require('http')
const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json')
  console.error('假装出错')
  res.end(JSON.stringify({
    errno: 0,
    message: 'pm2  start  server2'
  })
  )
})
server.listen(3000)
console.log('server is listen on port 3000')