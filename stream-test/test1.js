// // 标准输入输出 node的实现, 启动 输入xxx 回车显示xxx
// process.stdin.pipe(process.stdout) 


// 2.
// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res)  // 最主要 拷贝 管道连接
//   }
// })
// server.listen(8888)


/*
** 复制文件 data.txt => data-bak.txt
*/
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt') 
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)
readStream.on('data', chunk =>{
  console.log(chunk.toString())  // 一点点读取
})
readStream.on('end', ()=>{
  console.log('copy done')
})


const http = require('http')
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream1 = fs.createReadStream(fileName1)
    readStream1.pipe(res)   // 浏览器访问 浏览器 直接返回了文件内容
  }
})
server.listen(8888)
