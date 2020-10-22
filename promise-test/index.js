const fs = require('fs');
const path = require('path');


// __dirname: 全局变量，当前文件夹，/files/a.json
// 取到文件绝对路径 => /Blog-Node/promise-test/files/a.json
const fullFileName = path.resolve(__dirname, 'files', 'a.json');


// 读取文件
fs.readFile(fullFileName, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  // 读出文件 data内容，默认二进制，toString()转一下
  console.log(data.toString())
})

