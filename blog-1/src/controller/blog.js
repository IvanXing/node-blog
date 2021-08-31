const { exec }  = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `    // 写where 1=1是为了后面连接sql语句不报错，注意最后的空格
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc;`
  // 返回promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {       // 返回只有一项的数组，取第一项
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content author 属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}');
  `
  return exec(sql).then(insertData => {
    console.log('insertData is', insertData)
    return {
      id: insertData.insertId   // insertId 本次插入的返回id
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  console.log('updateBlog postData::', id, blogData)
  return true
}

const delBlog = (id) => {
  // id 就是要删除博客的id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};