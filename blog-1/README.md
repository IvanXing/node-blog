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