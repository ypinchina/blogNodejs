const fs = require('fs')
const path = require('path')
const readline = require('readline')//nodejs自带的逐行分析模块
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)
const rl = readline.createInterface({
    input:readStream
})
let num = 0
let sum = 0
rl.on('line', (data) => {
    if(!data) {
        return
    }
    sum++
    let str = data.split('---')[2]
    if(str.indexOf('Chrome') > -1) {
        num++
    }
})
rl.on('close', () => {
    console.log('Chrome占比：' + num/sum)
})