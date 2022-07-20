import request from '@/utils/request'
export const goodsCategoriesList = (params) => {
  return request({
    url: 'categories',
    params
  })
}
export const getGoodsList = ({ query, pagenum = 1, pagesize }) => {
  return request({
    url: 'goods',
    params: {
      query, pagenum, pagesize
    }
  })
}
export const editCategories = ({ id, catName }) => {
  return request({
    method: 'PUT',
    url: `categories/${id}`,
    data: { cat_name: catName }
  })
}
export const editGoods = (data) => {
  return request({
    method: 'PUT',
    url: `goods/${data.id}`,
    data
  })
}
export const deleteCategories = (id) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}`
  })
}
export const deleteGoods = (id) => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}
