import request from '@/utils/request'
/**
 *增加删除标签
 * @param {*} data
 * @returns
 */
export const addParams = (data) => {
  return request({
    url: `categories/${data.id}/attributes/${data.attr_id}`,
    method: 'PUT',
    data
  })
}
/**
 *删除参数
 * @param {*} data
 * @returns
 */
export const delParams = (data) => {
  return request({
    url: `categories/${data.id}/attributes/${data.attrId}`,
    method: 'DELETE'
  })
}
/**
 *增加参数
 * @param {*} data
 * @returns
 */
export const toAddParams = (data) => {
  return request({
    url: `categories/${data.id}/attributes`,
    method: 'POST',
    data
  })
}
