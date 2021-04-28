const fs = require('fs'); // fs文件操作模块
const path = require('path');  // 路径模块


// __dirname: 全局变量，当前文件目录，后面的参数是拼接/files/a.json
// path.resolve: 取到文件绝对路径 => User/xxx/Blog-Node/promise-test/files/a.json
const fullFileName = path.resolve(__dirname, 'files', 'a.json');

console.log('__dirname==>', __dirname)
console.log('fullFileName==>', fullFileName)

// 读取文件
fs.readFile(fullFileName, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  // 读出文件 data内容，默认二进制，toString()转一下
  console.log(data.toString())
})

