import request from '@/utils/request.js'
// 查询分类属性
export function findArticle (data) {
  return request({
    url: '/admin/article/find',
    method: 'post',
    data
  })
}

export function addArticle (data) {
  return request({
    url: '/admin/article/add',
    method: 'post',
    data
  })
}

export function removeArticle (data) {
  return request({
    url: '/admin/article/remove',
    method: 'post',
    data
  })
}
