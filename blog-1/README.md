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
-- show tables;

-- 插入
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