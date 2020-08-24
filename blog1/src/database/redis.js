const REDIS_CONFIG = require('../conf/db')
const redis = require('redis')
let redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.error(err)
})

const redisGet = function(key) {//获取redis的方法
    return new Promise((resolve, reject) => {
        redisClient.get(key,(err, val) => {
            if(err) {
                reject(err)
                return
            }
            if(val === 'null') {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
}
const redisSet = function(key, val) {//设置redis的方法
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}
module.exports = { redisGet, redisSet }