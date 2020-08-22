//根据环境变量配置数据库
const env = process.env.NODE_ENV
let SQL_CONFIG
if(env === 'dev') 
{
  SQL_CONFIG = {
        "host": "localhost",//本地的mysql地址 本地环境
        "user": "root",
        "password": "123456",
        "port": '3306',
        "database": "myblog"
    }
} else if(env === 'production') {
    SQL_CONFIG = {
        "host": "www.......com",//生产环境的数据库地址
        "user": "root",
        "password": "123456",
        "port": '3306',
        "database": "myblog"
    }
}
module.exports = SQL_CONFIG