const mysql = require('mysql')
const SQL_CONFIG = require('../conf/db')

const con = mysql.createConnection(SQL_CONFIG)
//发送数据库配置

con.connect()
//链接数据库

function exec(sql) {//参数sql是sql语句
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
module.exports = exec