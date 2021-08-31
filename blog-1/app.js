const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

/*
** 用于处理 post data
*/
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
      if (req.method !== 'POST') {
          resolve({})
          return
      }
      if (req.headers['content-type'] !== 'application/json') {
          resolve({})
          return
      }
      let postData = ''
      req.on('data', chunk => {
          postData += chunk.toString()
      })
      req.on('end', () => {
          if (!postData) {
              resolve({})
              return
          }
          resolve(
              JSON.parse(postData)
          )
      })
  })
  return promise
}


const serverHandle = (req, res) => {
  // 设置返回格式为json
  res.setHeader('Content-type', 'application/json');

  // 处理 url
  const url = req.url;
  res.path = url.split('?')[0];  // path是前半部分

  // 解析 query
  req.query = querystring.parse(url.split('?')[1]);  // 参数是后半部分

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';  //k1=v1;k2=v2;k3=v3...
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()   // 去掉空格，同名值后面替换前面
    const val = arr[1].trim()
    req.cookie[key] = val
  });


  // 处理 post data
  getPostData(req).then(postData => {

    //  放到 新定义的 req.body 中
    req.body = postData;

    /*
    ** 处理 blog 路由
    */
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }

    // promise 改造
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    /*
    ** 处理 user 路由
    */

    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    //   return;
    // }

    const userData = handleUserRouter(req, res);
    if (userData) {
      userData.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found");
    res.end();

  })

  

};

module.exports = serverHandle;