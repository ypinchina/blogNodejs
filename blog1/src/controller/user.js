const exec = require('../database/db')
const loginCheck = (username, password) => {
    const sql = `select username, password from 
    users where username = '${ username }' and password = '${ password }';`
    return exec(sql).then(res => {
        if (res[0]) {
            return 1
        } else {
            return 0
        }
    })
}
module.exports = { loginCheck }