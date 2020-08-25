const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'text.log')

// fs.readFile(fileName, (err, data) => {
//     //回调方法是异步的
//     if(err) {
//         console.error(err)
//         return
//     }
//     // data是二进制数据 需要toString()
//     console.log(data.toString())
// })
let needWrite = `1ldjhoqwtoqtqothwtwqoqeqweqwe\n`
let opt = {
  flag: 'a'//append 追加写入    'w'是默认值 =write  覆盖
}
fs.writeFile(fileName, needWrite, opt , err => {
    if(err) {
        console.error(err)
        return
    } 
})

fs.exists(fileName+'1', result => {
    console.log('exist', result)
})