const serverHandle = (req, res) => {
  // 设置返回格式为json
  res.setHeader('Content-type', 'application/json');

  const resData = {
    name: 'Ivan',
    site: 'SH',
  }

  res.end(JSON.stringify(resData));
};

module.exports = serverHandle;