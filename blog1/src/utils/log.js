const  fs = require('fs')
const path = require('path')
const fullName = path.join(__dirname, '../', '../', 'logs/access.log')
//创建输入流
const writeStream = fs.createWriteStream(fullName, {
    flags: 'a'//append 追加写入
})
function writeLogs(wStream, logs) {
    wStream.write(logs + '\n')
}
function access(logs) {
    writeLogs(writeStream, logs)
}

module.exports = access