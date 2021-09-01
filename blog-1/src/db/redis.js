const redis = require('redis')
const { REDIS_CONF }  = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host) 
// 监控错误
redisClient.on('error', err => {
  console.log(err)
})

// redis 设置值
function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print) 
}

// redis 取值，取值异步，用promise封装
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {   // 无val处理
        resolve(null)
        return
      }
      // 用try catch 兼容json转换格式  如果是json返回json对象 ，不是就直接返回
      try {
        resolve(JSON.parse(val))   
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get,
}
