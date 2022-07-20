<template>
  <!-- //编辑用户提交 -->
  <el-dialog
    title="编辑用户"
    :visible="editShow"
    @close="$emit('update:editShow', false)"
  >
    <el-form
      :model="editForm"
      :rules="rules"
      ref="editForm"
      label-width="100px"
      class="demo-editForm"
      hide-required-asterisk
    >
      <template v-if="editForm.username">
        <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="editForm1.username" :disabled="!!editForm.username"></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="editForm1.email"
          :disabled="!editForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="电话"
        prop="mobile"
      >
        <el-input
          v-model="editForm1.mobile"
          :disabled="!editForm.username"
        ></el-input>
      </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:editShow', false)">取 消</el-button>
      <el-button type="primary" @click="editSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { editUserSubmit } from '@/api/user.js'
export default {
  props: {
    editShow: {
      type: Boolean,
      required: true
    },
    editForm: {
      type: Object,
      required: true
    },
    rules: {
      required: true
    }

  },
  created () {

  },
  data () {
    return {
      // editUserShow: true
      editForm1: this.editForm

    }
  },
  methods: {
    // 编辑确认
    async editSubmit () {
      try {
        await this.$refs.editForm.validate()
        try {
          // const res = await editUserSubmit({ id: this.editForm.id, email: this.editForm.email, mobile: this.editForm.mobile })
          // const res = await editUserSubmit(this.editForm)
          // 获取新添加用户信息
          // console.log(res)
          // 关闭弹出框
          // this.editUserShow = false
          this.$emit('editSubmit', this.editForm)
          this.$emit('update:editShow', false)
          this.$emit('updateList')
          // this.getUserList(1, 10)
          this.$message.success('更新成功')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err, '校验失败')
      }
    }
  },
  computed: {
    // name: {
    //   get () {
    //     return this.editForm.username ? this.editForm.username : this.editForm.goods_name
    //   },
    //   set (val) {
    //     return val
    //   }
    // }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
