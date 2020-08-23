const exec = require('../database/db')
const login = (username, password) => {
    const sql = `select username, password from 
    users where username = '${ username }' and password = '${ password }';`
    return exec(sql).then(res => {
        return res[0]
    })
}
module.exports = { login }