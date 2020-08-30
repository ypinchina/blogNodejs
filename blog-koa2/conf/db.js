//根据环境变量配置数据库
const env = process.env.NODE_ENV
let SQL_CONFIG
let REDIS_CONFIG//redis配置
if(env === 'dev') 
{
  SQL_CONFIG = {
        "host": "localhost",//本地的mysql地址 本地环境
        "user": "root",
        "password": "123456",
        "port": '3306',
        "database": "myblog"
    },
    REDIS_CONFIG = {
        "port": 6379,
        "host": "127.0.0.1"
    }
} else if(env === 'production') {
    SQL_CONFIG = {
        "host": "localhost",//生产环境的数据库地址
        "user": "root",
        "password": "123456",
        "port": '3306',
        "database": "myblog"
    },
    REDIS_CONFIG = {
        "port": 6379,
        "host": "127.0.0.1"
    }
}
module.exports = { SQL_CONFIG, REDIS_CONFIG }