const crypto = require('crypto')
const key = `$%@_0qG7sZcw1`

function md5(content) {
  let md5 = crypto.createHash('md5')
  return  md5.update(content).digest("hex")
}
function genPassword(password) {
    const str = `password=${password}and,key=${key}`
    return  md5(str)
}
module.exports = genPassword