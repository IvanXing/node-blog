const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { resolve } = require('path');

/*
** 用于处理 post请求 的post data
*/
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return; 
      }
      resolve(
        JSON.parse(postData)
      )
    })

  })
  return promise;
 
}

const serverHandle = (req, res) => {

  // 设置返回格式为json
  res.setHeader('Content-type', 'application/json');

  // 统一处理 url放入res中
  const url = req.url;
  res.path = url.split('?')[0];  //path是前半部分

  // 解析get的url参数 放入请求req的query中
  req.query = querystring.parse(url.split('?')[1])  // query后半部分

  // 处理 请求传入参数 postData
  getPostData(req).then(postData => {

    req.body = postData;  // 放入请求req的body中

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
     res.end(JSON.stringify(blogData));
     return;
    }

    // 处理 user 路由
    const userData = handleUserRouter(req, res);
    if (userData) {
     res.end(JSON.stringify(userData));
     return;
    }

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found");
    res.end();

  })

 

};

module.exports = serverHandle;