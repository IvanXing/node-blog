## 安装
- npm init -y
- npm i mysql

- 采坑之旅

- https://baijiahao.baidu.com/s?id=1663734534335365714&wfr=spider&for=pc

- https://www.cnblogs.com/li-li/p/11250864.html

- https://yq.aliyun.com/articles/705235

- https://blog.csdn.net/weixin_44156220/article/details/101288086


- mac 下卸载 mysql
  - https://www.jianshu.com/p/276c1271ae14

  - https://blog.csdn.net/techroadman/article/details/78825964

  - https://stackoverflow.com/questions/1436425/how-do-you-uninstall-mysql-from-mac-os-x

- 终极解决方案

- 修改 mysql 密码
- https://stackoverflow.com/a/50131831/10930990
- https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/50131831#50131831


```
Execute the following query in MYSQL Workbench

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:

flush privileges;

Try connecting using node after you do so.

If that doesn't work, try it without @'localhost' part.
```