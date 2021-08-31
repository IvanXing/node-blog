const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

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
          res.setHeader('Set-Cookie', `username=${data.username}; path=/`)

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