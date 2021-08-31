const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123456',
    port: '3306',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句, query 异步执行
const sql = 'select * from blogs;'
// const sql = `insert into blogs (title, content, createtime, author) values ('标题D', '内容D',1226871704408, 'zhangsan')`
// const sql = `delete from blogs where title = '标题D'`
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()