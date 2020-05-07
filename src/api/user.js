import request from '@/utils/request.js'

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'get',
    data
  })
}
