/*
** 创建res.end返回成功失败的数据模型
*/

class BaseModel {
  constructor(data, message) {
      if (typeof data === 'string') {   // 兼容传入值只有一个的操作，对象，string
          this.message = data
          data = null
          message = null
      }
      if (data) {
          this.data = data
      }
      if (message) {
          this.message = message
      }
  }
}

// 成功
class SuccessModel extends BaseModel {
  constructor(data, message) {
      super(data, message)
      this.errno = 0
  }
}

// 失败
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