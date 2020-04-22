import request from '@/utils/request.js'

export function findCategory(data) {
  return request({
    url: '/admin/category/find',
    method: 'get',
    data
  })
}
