import request from '@/utils/request'
export const allRightList = (type) => {
  return request({
    url: `rights/${type}`
  })
}
export const menuRight = (type) => {
  return request({
    url: 'menus'
  })
}
