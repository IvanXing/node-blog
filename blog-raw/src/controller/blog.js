const getList = (author, keyword) => {
  // 返回假数据，格式是正确的
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: '1603285217168',
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: '1603285329584',
      author: 'lisi'
    },
  ]
}

const getDetail = (id) => {
  // 返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '1603285217168',
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性

  console.log('newBlog blogData==>', blogData)

  return {
    id: 3  // 表示新建博客，插入数据表里的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  // blogData 是一个博客对象，包含title content 属性

  console.log('update blog==>', id, blogData)

  return true;
}

const deleteBlog = (id) => {
  return true;
}
 
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}