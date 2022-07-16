export const username = [
  { required: true, message: '请输入用户名称', trigger: 'blur' },
  { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
]
export const password = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
]
export const email = [
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式不正确', trigger: 'blur' }
]
export const mobile = [
  { required: true, message: '请输入手机号', trigger: 'blur' },
  { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号码格式不正确', trigger: 'blur' }
]
