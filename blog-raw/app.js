// http.createServer的回调

const serverHandle = (req, res) => {
  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'ivanq',
    site: 'sh',
    env: process.env.NODE_ENV 
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandle;