import request from '@/utils/request'
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
/**
 *
 * @param {*} param0
 * @returns 用户列表
 */
export const getUserList = ({ pagenum = 1, pagesize, query }) => {
  return request({
    url: 'users',
    params: {
      pagenum,
      pagesize,
      query
    }
  })
}
/**
 *
 * @param {*} param0
 * @returns 添加用户
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}
/**
 *修改用户状态
 * @param {*} param0
 * @returns
 */
export const editUserState = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
/**
 *编辑用户提交
 * @param {*} param0
 * @returns
 */
export const editUserSubmit = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: { email, mobile }
  })
}
/**
 *删除单个用户
 * @param {*} id
 * @returns
 */
export const deleteUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
