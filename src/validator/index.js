
/** *
 *
 * 表单公共验证方法
 *
 * **/

// 检查必填项不小于len长度的字符串
export const checkRequired = (message, len = 0) => {
  return [{
    required: true, trigger: ['blur', 'change'], validator: (rule, value, callback) => {
      if (value.trim().length <= len) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  }]
}
