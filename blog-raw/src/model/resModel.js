// 在res.end返回时
// 返回值是一个清晰的数据结构

// 成功 errno 是 0 取data，失败 errno 是 -1 取message

class BaseModel {
  constructor(data, message) {
    if(typeof data === 'string') {  // data是不是对象，message是提示字符串，兼容处理
      this.message = data;
      data = null;
      message = null;
    }
    if(data) {
      this.data = data;
    }
    if(message) {
      this.message = message;
    }
  }
}

// 成功返回
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)  // super 执行 BaseModel
    this.errno = 0
  }
}

// 失败返回
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
