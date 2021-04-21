// http.createServer的回调

const serverHandle = (req, res) => {
  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'ivan',
    site: 'sh',
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandle;