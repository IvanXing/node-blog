const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')   // 关键代码  
  // 这里就是想写入一行文字，就用 writeStream 这个一个流对象，没必要用 pipe 。
  // 用 pipe 至少得两个流对象，为此再额外创建一个，也没这个必要。
}

// 生成 write stream
function createWriteStream(fileName) {
  // path.join 可以传入很多参数拼接
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}