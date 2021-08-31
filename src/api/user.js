// import request from '@/utils/request'

export function login(data) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: {
        access_token: 'text-token'
      }
    })
  })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      // 模拟用户信息
      data: {
        roles: ['admin'],
        avatar: '',
        introduction: '',
        username: 'vvmily'
      }
    })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: {
        message: '退出成功'
      }
    })
  })
}
