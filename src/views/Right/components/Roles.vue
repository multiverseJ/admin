<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加用户</el-button>
      <!-- 表格 -->
      <el-table
        :data="roleList"
        style="width: 100%"
        stripe
        border
        class="table"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row
                v-for="item in props.row.children"
                :key="item.id"
                align="middle"
                type="flex"
              >
                <el-col :span="5">
                  <el-tag>{{ item.authName }}</el-tag>
                  <span class="el-icon-caret-right"></span>
                </el-col>
                <el-col :span="19">
                  <el-row
                    v-for="obj in item.children"
                    :key="obj.id"
                    type="flex"
                    align="middle"
                    class="second"
                  >
                    <el-col :span="5">
                      <el-tag type="success">{{ obj.authName }}</el-tag>
                      <span class="el-icon-caret-right"></span>
                    </el-col>
                    <el-col :span="19"
                      ><el-tag
                        v-for="tag in obj.children"
                        :key="tag.id"
                        closable
                        class="thirdtag"
                        @close="delTag(obj.children, tag.id, props.row.id)"
                      >
                        {{ tag.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="assign(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="roleShow">
      <el-tree
        ref="tree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-checked-keys="selectList"
        :props="defaultProps"
        default-expand-all
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleShow = false">取 消</el-button>
        <el-button type="primary" @click="addRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteRoleRight, addRoleRight, roleList } from '@/api/role'
import { allRightList } from '@/api/right'
export default {
  async created () {
    this.getRoleList()
  },
  data () {
    return {
      roleList: [],
      roleShow: false,
      rightList: [],
      selectList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      addList: {}
    }
  },
  methods: {
    async getRoleList () {
      try {
        const res = await roleList()
        this.roleList = res.data.data
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 删除标签
    async delTag (arr, rightId, roleId) {
      const index = arr.findIndex(item => item.id === rightId)
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRoleRight(roleId, rightId)
        arr.splice(index, 1)
        this.$message({
          type: 'success',
          message: '取消权限成功'
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
      this.roleShow = true
      const res = await allRightList('tree')
      console.log(res)
      this.rightList = res.data.data
      console.log([val])
      this.addList = val
      this.selectList = this.addId([val])
    },
    // 选中末尾节点id
    addId (arr) {
      const newArr = []
      const fn = (Arr) => {
        Arr.forEach(item => {
          if (item.children) {
            fn(item.children)
          } else if (item.id) {
            newArr.push(item.id)
          }
        })
        return newArr
      }
      return fn(arr)
    },
    // 角色授权
    async addRight () {
      try {
        this.roleShow = false
        console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
        const rids = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join(',')
        console.log(rids)
        await addRoleRight(this.addList.id, rids)
        this.getRoleList()
        this.$message.success('更改成功')
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 20px;
  // max-height: 80vh;
  .table {
    margin-top: 15px;
  }
}
.el-row {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
  .second {
    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
  .thirdtag {
    margin: 5px;
  }
}
.el-form.demo-table-expand.el-form--label-left.el-form--inline {
  padding-left: 40px;
}
</style>
