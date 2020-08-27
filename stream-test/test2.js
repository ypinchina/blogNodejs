//使用stream复制 和读取文件信息
const fs = require('fs')
const path = require('path')
const afile = path.resolve(__dirname, 'a.txt')
const bfile = path.resolve(__dirname, 'b.txt')
const readStream = fs.createReadStream(afile)
const writeStream = fs.createWriteStream(bfile)
readStream.pipe(writeStream)

readStream.on('data', chunk => {
    console.log(chunk.toString())
})

readStream.on('end', () => {
    console.log('copy done')
})