import request from '@/utils/request.js'

// 查询分类属性
export function findCategory(data) {
  return request({
    url: '/admin/category/findCategoryAndNum',
    method: 'get',
    data
  })
}

// 新增分类
export function addCategory(data) {
  return request({
    url: '/admin/category/add',
    method: 'post',
    data
  })
}

// 注销分类
export function cancelCategory(data) {
  return request({
    url: '/admin/category/cancel',
    method: 'post',
    data
  })
}

// 修改分类
export function updateCategory(data) {
  return request({
    url: '/admin/category/update',
    method: 'post',
    data
  })
}
