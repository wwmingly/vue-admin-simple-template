import request from '@/utils/request'

export default {
  getCode(params) {
    return request({
      url: '/code',
      method: 'get',
      params,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  },
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
      headers: {}
    })
  },
  getInfo(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
      headers: {}
    })
  },
  logout(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
      headers: {}
    })
  }
}
