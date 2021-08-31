const env = process.env.NODE_ENV  // 获取当前环境

// 配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'abc123456',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'abc123456',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}