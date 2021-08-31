const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))       // 当前时间加一天单位ms，转换GMT格式
  console.log('d.toGMTString() is', d.toGMTString())
  return d.toGMTString()
}


const handleUserRouter = (req, res) => {
    const method = req.method;  // GET POST
  
    // 登陆接口
    if (method === 'GET' && res.path === '/api/user/login') {
      // const { username, password } = req.body;
      const { username, password } = req.query;
      const result = login(username, password);
      return result.then(data => {
        if (data.username) {
          
          // 存储cookie path=/是跟路由，所有路由生效，否则就是本url
          res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

          return new SuccessModel()
        } 
        return new ErrorModel('登录失败')
      })
    }

    // 登录验证测试
    if (method === 'GET' && res.path === '/api/user/login-test') {
      // 登陆过才有cookie
      if (req.cookie.username) {
        return Promise.resolve(new SuccessModel({
          username: req.cookie.username
        }))
      } 
      return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handleUserRouter;