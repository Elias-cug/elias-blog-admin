import request from '@/utils/request.js'

// 新增时间线
export function addTimeline (data) {
  return request({
    url: '/admin/timeline/add',
    method: 'post',
    data
  })
}

// 删除时间线
export function cancelTimeline (data) {
  return request({
    url: '/admin/timeline/cancel',
    method: 'post',
    data
  })
}

// 修改时间线
export function modifyTimeline (data) {
  return request({
    url: '/admin/timeline/modify',
    method: 'post',
    data
  })
}

// 查询时间线
export function findTimeline (data) {
  return request({
    url: '/admin/timeline/find',
    method: 'post',
    data
  })
}
