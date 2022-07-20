<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="adduser">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="search">
              <el-input
                class="input"
                placeholder="请输入内容"
                v-model="input"
                clearable
              >
              </el-input>
              <el-button
                slot="append"
                type="info"
                icon="el-icon-search"
                class="sear"
                @click="search"
              ></el-button>
            </div>
          </el-col>
          <el-col :span="7"
            ><el-button type="primary" @click="addClick"
              >添加用户</el-button
            ></el-col
          >
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table
        :data="
          usersList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
        stripe
        border
        class="table"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="stateChange(scope.row.id, $event)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editUserFn(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deletefn(scope.row)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="assign(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersList.length"
      >
      </el-pagination>
    </el-card>
    <!-- //添加用户 -->
    <el-dialog title="添加用户对话框" :visible.sync="addUserShow">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- //编辑用户提交
    <el-dialog title="编辑用户" :visible.sync="editUserShow">
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-editForm"
        hide-required-asterisk
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserShow = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog> -->
    <EditForm
      :editShow.sync="editUserShow"
      :editForm="editForm"
      :rules="rules"
      @updateList="getUserList(1, 10)"
      @editSubmit="editUserSubmit"
    ></EditForm>
    <!-- 分配用户角色 -->
    <el-dialog title="提示" :visible.sync="assignShow">
      <p>当前的用户：{{ editForm.username }}</p>
      <p>当前的角色：{{ editForm.role_name }}</p>
      分配新角色：<el-select v-model="select" placeholder="请选择">
        <el-option
          v-for="item in selectList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignShow = false">取 消</el-button>
        <el-button type="primary" @click="roleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditForm from '@/components/EditForm.vue'
import { username, password, email, mobile } from '@/utils/validate'
import { roleList, assignRole } from '@/api/role'
import { getUserList, addUser, editUserState, editUserSubmit, deleteUser } from '@/api/user'
export default {
  created () {
    this.getUserList(1, 50)
  },
  data () {
    return {
      usersList: [],
      currentPage: 1,
      pagesize: 10,
      input: '',
      select: '',
      input3: '',
      selectList: [],
      buttonvalue: true,
      addUserShow: false,
      editUserShow: false,
      assignShow: false,
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: { username, password, email, mobile },
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: '',
        role_name: ''
      }
    }
  },
  methods: {
    async getUserList (pagenum, pagesize, query) {
      try {
        const res = await getUserList({
          pagenum,
          pagesize,
          query
        })
        console.log(res)
        this.usersList = res.data.data.users
        console.log(this.usersList)
      } catch (err) {
        console.log(err)
      }
    },
    // 分页
    handleSizeChange (val) {
      this.pagesize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    addClick () {
      this.addUserShow = true
    },
    async submit () {
      try {
        await this.$refs.ruleForm.validate()
        try {
          const res = await addUser(this.ruleForm)

          // 获取新添加用户信息
          console.log(res)
          // 关闭弹出框
          this.addUserShow = false
          // this.$refs.ruleForm.resetFields()
          this.getUserList(1, 10)

          this.$message.success('创建成功')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err, '校验失败')
      }
    },
    // 点击开关切换状态
    async stateChange (uId, type) {
      try {
        await editUserState({ uId, type })
        this.$message.success('修改用户状态成功')
      } catch (err) {
        this.$message.error('修改用户状态失败')
      }
    },
    // 编辑用户
    editUserFn (val) {
      this.editUserShow = true
      console.log(val)
      this.editForm.username = val.username
      this.editForm.email = val.email
      this.editForm.mobile = val.mobile
      this.editForm.id = val.id
    },
    // 编辑确认
    async editUserSubmit (editForm) {
      console.log(editForm)
      try {
        const res = await editUserSubmit(editForm)
        // 获取新添加用户信息
        console.log(res)
        // this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 根据 ID 查询用户信息
    async search () {
      this.getUserList(1, 50, this.input)
    },
    // 删除单个用户
    async deletefn (val) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log(val)
        await deleteUser(val.id)
        this.getUserList(1, 10)
        await this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 分配用户角色
    async assign (val) {
      this.assignShow = true
      const res = await roleList()
      console.log(res)
      this.selectList = res.data.data
      this.editForm.id = val.id
      this.editForm.role_name = val.role_name
      this.editForm.username = val.username
      console.log(val)
    },
    async roleSubmit () {
      try {
        this.assignShow = false

        const res = await assignRole({ id: this.editForm.id, rid: this.select })
        console.log(res)
        if (res.data.meta.status === 400) this.$message.error('修改失败')
      } catch (err) {
        console.log(err)
      }

      // console.log(this.select)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { EditForm }
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 20px;
  // max-height: 80vh;
}
.search {
  display: flex;
  overflow: hidden;
  border-radius: 2px;
  .sear {
    background-color: #f5f7fa;
    color: #000;
    border: 1px solid #dcdfe6;
    border-radius: unset;
    border-left: none;
  }
}
.table {
  margin-top: 20px;
}
.page {
  margin-top: 20px;
}
.btn {
  display: flex;
}
</style>
