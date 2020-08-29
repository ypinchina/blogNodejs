const REDIS_CONFIG = require('../conf/db')
const redis = require('redis')
let redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.error(err)
})

module.exports = redisClient