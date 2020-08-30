const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const genPassword = require('../utils/cryp')
const async login = (username, password) => {
    username = escape(xss(username))
    password = escape(genPassword(xss(password)))
    const sql = `select username, password from 
    users where username = ${ username } and password = ${ password };`
    const res = await exec(sql)
    return res[0]
}
module.exports = { login }