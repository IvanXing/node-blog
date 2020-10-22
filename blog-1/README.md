- npm init -y
- 新建bin文件夹，下www.js为入口文件
- 运行 node bin/www.js ，访问localhost:8000查看结果，先跑通 http

- 安装 nodemon 和 cross-env
  - npm install nodemon cross-env --save-dev
  - nodemon可以监控文件变化，nodemon ./bin/www.js
  - cross-env NODE_ENV=dev，设置当前是dev环境，兼容linux和windows环境

- npm run dev


## 1. 创建路由

- 新建 src/router/blog.js & user.js

## 2. 建立数据模型

- 作用：在res.end返回时，返回一个清晰的数据结构，包含errno
- 新建 src/model/resModel.js

## 3. 处理层 controller

- 新建 src/controller/blog.js
- Date.now()  =>  1603285217168

## 4. 分层总结

- bin/www.js 中是 createServer 的逻辑
- app.js 中是设置 请求头，404，以及返回值的公共逻辑，不涉及业务
- src/router 中 只管路由，参数，返回正确的格式
- src/controller 中处理 sql 逻辑，返回值

## 5. GET 直接通过参数处理  POST 异步流接受数据，需要用promise处理 POST时候的 postData