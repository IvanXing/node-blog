const serverHandle = (req, res) => {
  // 设置返回格式为json
  res.setHeader('Content-type', 'application/json');

  const resData = {
    name: 'Ivan',
    site: 'SH',
    // process是node提供的全局变量，根据yarn run dev or prd 识别cross-env设置不同设置环境
    env: process.env.NODE_ENV  
  }

  res.end(JSON.stringify(resData));
};

module.exports = serverHandle;