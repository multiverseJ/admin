import request from '@/utils/request'
// 订单列表
export const getBookList = (params) => {
  return request({
    url: 'orders',
    params
  })
}
