const redis = require('redis')
let redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})
//测试
redisClient.set('myname', 'zhangsan2', redis.print)
redisClient.get('myname',(err, val) => {
    if(err) {
        console.error(err)
        return
    }
    console.log(val)
})
//redis退出
redisClient.quit()