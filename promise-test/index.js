const fs = require('fs')
const path = require('path')
const { resolve } = require('path')



// function getFileContent(fileName, callback) {
//     let fileNamePath = path.resolve(__dirname, 'files', fileName)
//     fs.readFile(fileNamePath, (err, data) => {
//         if(!data) {
//             console.log(err)
//             return
//         }
//         callback(JSON.parse(data.toString()))
//     })
// }
// getFileContent('a.json', aData => {
//     console.log('adata', aData)
//     getFileContent(aData.next, bData => {
//         console.log('bdata', bData)
//         getFileContent(bData.next, cData => {
//             console.log('cdata', cData)
//         })
//     })
// })
//promise调用方法
function getFileContent(fileName) {
    let fileNamePath = path.resolve(__dirname, 'files', fileName)
    return new Promise((resolve, reject) => {
        fs.readFile(fileNamePath, (err, data) => {
            if(!data) {
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
    })
  })
}
// getFileContent('a.json').then(res => {
//     console.log(res)
//     return getFileContent(res.next)
// }).then(res => {
//     console.log(res)
//     return getFileContent(res.next)
// }).then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)
// })
async function readFileDate(fileName) {
    try {
        const aData = await getFileContent(fileName)
        console.log(aData)
        const bData = await getFileContent(aData.next)
        console.log(bData)
        const cData = await getFileContent(bData.next)
        console.log(cData)
    } catch(err) {
        console.error(err)
    }
}
readFileDate('a.json')