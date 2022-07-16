import request from '@/utils/request'
/**
 *分配角色
 * @param {*} param0
 * @returns
 */
export const assignRole = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: { rid }
  })
}
/**
 *角色列表
 * @returns
 */
export const roleList = () => {
  return request({
    url: 'roles'
  })
}
/**
 * 删除角色指定权限
 * @param {*} param0
 * @returns
 */
export const deleteRoleRight = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
export const addRoleRight = (roleId, rids) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: { rids }
  })
}
