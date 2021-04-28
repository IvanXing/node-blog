const fs = require('fs');
const path = require('path');

/*
** callback-hell 回调地狱 
** 读取文件，下一步依赖上一步的结果，不是并发
*/

// // callback 方式获取一个文件的内容
function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        callback(
            JSON.parse(data.toString())
        )
    })
}

// 测试 callback-hell
// aData是一个回调函数，传入aDate并打印

getFileContent('a.json', aData => {
    console.log('a data', aData)

    // aData.next 就是 b 的文件名
    getFileContent(aData.next, bData => {
        console.log('b data', bData)
        getFileContent(bData.next, cData => {
            console.log('c data', cData)
        })
    })
})


// 输出结果
// a data { next: 'b.json', msg: 'this is a' }
// b data { next: 'c.json', msg: 'this is b' }
// c data { next: null, msg: 'this is c' }