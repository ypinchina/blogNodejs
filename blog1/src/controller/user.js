const { exec, escape } = require('../database/db')
const login = (username, password) => {
    username = escape(xss(username))
    password = escape(xss(password))
    const sql = `select username, password from 
    users where username = ${ username } and password = ${ password };`
    console.log('sql is', sql)
    return exec(sql).then(res => {
        return res[0]
    })
}
module.exports = { login }