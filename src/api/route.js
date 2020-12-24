import request from '@/utils/request.js'

export function getRoutes (data) {
  return request({
    url: '/admin/routes/findRoutes',
    method: 'get',
    data
  })
}
