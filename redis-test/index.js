const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')  //本机redis的ip和端口
// 监控错误
redisClient.on('error', err => {
  console.log(err)
})

// 测试
redisClient.set('myname', 'ivan', redis.print)   // key value 打印设置结果状态
redisClient.get('myname', (err, val) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('val', val)

  // 退出
  redisClient.quit()
})
