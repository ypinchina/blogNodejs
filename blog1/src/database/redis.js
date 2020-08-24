const REDIS_CONFIG = require('../conf/db')
const redis = require('redis')
let redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.error(err)
})

cost redisGet = function(key) {
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
const redisSet = function(key, val) {
    if(val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}
module.exports = { redisGet, redisSet }