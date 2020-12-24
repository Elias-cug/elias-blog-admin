import request from '@/utils/request.js'
const base = '127.0.0.1:3000'
// post 方式提交
export function postRequest (url, params) {
  return request({
    method: 'post',
    url: `${base}/cxqr${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function uploadFileRequest (url, params) {
  return request({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function getRequest (url) {
  return request({
    method: 'get',
    url: `${base}/cxqr${url}`
  })
}

export const putRequest = (url, params) => {
  return request({
    method: 'put',
    url: `${base}/cxqr${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
