# 一、初始化项目

- npm init -y
- 新建bin文件夹，下www.js为入口文件
- 运行 node bin/www.js ，访问localhost:8000查看结果，先跑通 http

- 安装 nodemon 和 cross-env
  - npm install nodemon cross-env --save-dev
  - nodemon可以监控文件变化，nodemon ./bin/www.js
  - cross-env NODE_ENV=dev，设置当前是dev环境，兼容linux和windows环境

- npm run dev
- npm run prd

- 通过 process.env.NODE_ENV 来识别 "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js" cross-env NODE_ENV指定的环境

# 二、项目分层

## 0. 分层总结

- www.js里创建http，监听端口
- 调用app.js中，设置请求头，解析url和参数，处理路由，未命中的404
- router中只管路由path，处理参数，返回正确格式
- controller中处理数据逻辑

## 1. 创建路由

- 新建 src/router/blog.js & user.js

## 2. 建立数据模型

- 新建 src/model/resModel.js
- 作用：在res.end返回时，返回一个清晰的数据结构，包含errno

## 3. 处理层 controller

- 新建 src/controller/blog.js
- Date.now()  =>  1603285217168

## 4. 分层总结

- bin/www.js 中是 createServer 的逻辑
- app.js 中是设置 请求头，404，以及返回值的公共逻辑，不涉及业务
- src/router 中 只管路由相关，来什么参数，返回给客户端什么，且是正确的格式
- src/controller 中处理 sql 逻辑，返回值，根据参数处理数据

- postdata是res.on监听data和end, res.end是一个异步的过程，需要promise
```
 if (method === "POST") {
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      resData.postData = postData;
      // 返回
      res.end(JSON.stringify(resData));
    });
  }
```
- 经过实际测试
```
req.headers['content-type'] 中，content 必须用小写，否则获取不到。
res.setHeader('Content-type', 'application/json') 中，content 大写小写浏览器都可以识别。但是，根据 http 协议的统一格式，还是建议 C 大写。
因此，总结一下。req.headers['content-type'] 中用小写，res.setHeader('Content-type', 'application/json') 中用大写。
```

## 5. GET 直接通过参数处理  POST 异步流接受数据，需要用promise处理 POST时候的 postData

## 6. 路由和API

- API = URL（路由） + get/post + 参数/返回值

# 三、MySQL 基础

- https://dev.mysql.com/downloads/mysql/
- https://dev.mysql.com/downloads/workbench/
- `show databases;`

## 1. 建库

- 创建 myblog 数据库
```
CREATE SCHEMA `myblog` DEFAULT CHARACTER SET utf8 ;
```
- 执行 show databases; 查询

## 2. 建表

- 两张表 users表 和blogs表

```
id  username  password  realname state
id  title  content  createtime  author
```

- longtext可以存储4g大小  bigint(20) 存储13位时间

```
column  datatype  pk主键  nn不为空  AI自动增加  Default默认值
id  int Y Y Y --
username  varchar(20) -- Y -- --
password varchar(20) -- Y -- -- 
realname varchar(10) -- Y -- --
state INT -- Y -- 1
```

```
column  datatype  pk主键  nn不为空  AI自动增加  Default默认值
id  int Y Y Y --
title  varchar(50) -- Y -- --
content longtext -- Y -- -- 
createtime bigint(20) -- Y -- 0
author varchar(20) -- Y -- -- 
```

```sql
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `myblog`.`users` 
ADD COLUMN `state` INT NOT NULL DEFAULT 1 AFTER `realname`;

ALTER TABLE `myblog`.`users` 
DROP COLUMN `state`;
```

## 3. 操作表

```sql
use myblog;
-- show tables; 显示所有的表

-- 插入
-- mysql关键字需要``引起来，列名-值
insert into users(username, `password`, realname) values ('zhangsan', '123', '张三');
insert into users(username, `password`, realname) values ('lisi', '123', '李四');

-- 查询全表列 * 消耗性能
select * from users;
-- 查询局部
select id, username from users;

select * from users where username='zhangsan';
select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';
select * from users where username like '%zhang%';
select * from users where `password` like '%1%';

-- 排序 默认正序 desc倒序
select * from users where `password` like '%1%' order by id;
select * from users where `password` like '%1%' order by id desc;

-- 更新 和 删除
update users set realname='李四2' where username='lisi';
-- 取消safe update设置
SET SQL_SAFE_UPDATES = 0;

delete from users where username = 'lisi';

select * from users;
select * from users where state = '1';
-- state !== 0
select * from users where state <> '0';

update users set state = '0' where username = 'lisi';
update users set state = '1' where username = 'lisi';

insert into blogs (title, content, createtime, author) values ('标题A', '内容A', 1604477996182, 'zhangsan');
insert into blogs (title, content, createtime, author) values ('标题B', '内容B', 1604478256477, 'lisi');

select * from blogs;
select * from users;

select * from blogs order by createtime desc;

select * from blogs where author = 'lisi' order by createtime desc;

select * from blogs where title like '%A%' order by createtime desc;

select version();
```

- mysql >= 5版本时 varchar(10) 可以存储10个汉字
- `Date.now()` 转化时间戳


# 四、SQL实现

## 1. Node.js链接MySQL工具

- npm i mysql --save 安装MySQl
- src下创建文件夹conf下创建db.js，根据环境切换连接地址
- src/db/mysql.js => 执行sql函数模块实现
- mysql.js 中返回promise => router/blog.js & app.js 中接收promise改造

# 五、登录

- 核心：登录校验 & 登录信息存储
- cookie 和 session
- session 写入 redis

## 5.1 cookie

### 5.1.1 什么是cookie

- 存储在浏览器的一段字符串，最大5kb
- 跨域不共享
- 格式如 k1=v1;k2=v2;k3=v3; 因此可以存储结构化数据
- 每次发送http请求，会将请求域的cookie一起发送给server
- server端可以修改cookie并返回浏览器
- 浏览器中也可以通过js修改cookie，但是有限制

### 5.1.2 js操作cookie，浏览器查看cookie

- 客户端查看cookie，三种方式
  - 1. 浏览器network中，请求头和返回体中
  - 2. 浏览器application中，左侧
  - 3. console中输入document.cookie

- JS查看修改cookie（有限制）
  - 不能修改，只能直接累加 document.cookie = 'k2=200'

### 5.1.3 Node Server端操作cookie实现登录验证

- 查看cookie
  - cookie在req.headers中
- 修改cookie
  - res.setHeader('Set-Cookie', `username=${data.username}; path=/`)
  - path=/ 标识根目录，适用于整个url
- 实现登录验证
  - 登录存储cookie，后续接口验证cookie中的username

### 5.1.4 cookie的限制

- httpOnly 浏览器修改无效，设置username也会被之前的username覆盖
- expires 设置过期时间
```js
res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
```

## 5.2 session

### 5.2.1 cookie的问题 -> session

- cookie存储username明文，暴露
- 如何解决：cookie中存储userid，server端对应username，session，server端存储用户信息
- session是登录存储会话信息的统称

### 5.2.2 本地存储session的问题

- 目前session直接是js变量，放在NodeJS进程内存中，进程重启丢失
  - 1. 进程内存有限，访问量过大，内存暴增怎么办，引用，堆内存
    - 操作系统会限制一个进程的最大可用内存
  - 2. 正式线上运行是多进程，进程之间内存无法共享
    - 每个Node都是分多个进程来跑的，多核处理器可以处理多个进程，每个进程都有session的话，进程内存不能共享

- 解决方案 redis（可集群扩展）
  - web serve常用的缓存数据库，数据存放在内存中
  - 相比于mysql速度访问快（内存存储 vs 硬盘存储）
  - redis内存存储成本高，数据量更小

- 浏览器 -> web server (多进程) -> 访问同一个 redis & mysql

- 为何session适合redis，而不是mysql
  - session访问频繁，每次都需要验证session，对性能要求高
  - session可以不考虑断电丢失的问题（redis不特殊配置会断电丢失）
  - session数据量不会太大（相比于mysql中存储的数据）

- 为何网站数据不适合redis
  - api操作频率与session比太低
  - 断电不能丢失，必须保留
  - 数据量大，内存成本太高

- 安装redis

```js
// 安装 brew install redis
// 启动 redis-server
// 打开操作界面 redis-cli （127.0.0.1:6379）
// 关闭 brew services stop redis
// 重启 brew services restart redis

// redis是key-value数据库
// 查看所有值
keys *
// 设置值
set myname ivan
// 取值
get myname
// 删除值
del myname
```

## 5.3 Redis

### 5.3.1 Node链接Redis

- redis-test文件中
- yarn init -y
- touch index.js
- yarn add redis --save
- node index.js 运行

### 5.3.2 blog-1 中封装redis

- yarn add redis --save

- src/conf/db.js中配置redis端口，db/redis.js中封装redis读取方法

- router/blog.js & user.js 中加登录验证，登录改回POST











