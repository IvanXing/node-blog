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

module.exports = {
  getList,
  getDetail
};