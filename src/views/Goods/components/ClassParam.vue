<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-form>
        <el-form-item label="选择商品分类" label-width="100px">
          <el-cascader
            v-model="value"
            :options="categoriesList"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button
            type="primary"
            size="mini"
            @click="dialogVisible = true"
            :disabled="buttonFlag"
            >添加参数</el-button
          >
          <el-table border :data="activeParams">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag
                  :key="index"
                  v-for="(tag, index) in props.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(props.row, index)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="分类名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="delActParamas(props.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button
            type="primary"
            size="mini"
            @click="addStaParams"
            :disabled="buttonFlag"
            >添加参数</el-button
          >
          <el-table border :data="activeParams">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag
                  :key="index"
                  v-for="(tag, index) in props.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(props.row, index)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="分类名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      title="添加动态参数"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="form">
        <el-form-item label="动态参数" label-width="80px" prop="activeParams">
          <el-input v-model="form.activeParams"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addActParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsCategoriesList, getParamsList } from '@/api/goods'
import { addParams, toAddParams, delParams } from '@/api/params'
export default {
  async created () {
    const res = await goodsCategoriesList()
    console.log(res)
    this.categoriesList = res.data.data
  },
  data () {
    return {
      categoriesList: [],
      value: '',
      activeName: 'first',
      id: null,
      activeParams: [],
      inputVisible: false,
      inputValue: '',
      dialogVisible: false,
      rules: {
        activeParams: [{ required: true, message: '请输入动态参数', trigger: 'blur' }, { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }]
      },
      form: {
        activeParams: ''
      },
      buttonFlag: true
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    handleChange (value) {
      if (value.length < 3) {
        this.buttonFlag = true
        this.activeParams = []
        return this.$message.error('请选择三级分类')
      }
      this.buttonFlag = false
      console.log(value)
      this.id = value[2]
      this.updateList()
    },
    // 更新表单
    async updateList () {
      try {
        const res = await getParamsList({ id: this.id, sel: 'many' })
        console.log(res)
        this.activeParams = res.data.data
        this.activeParams.forEach(item => {
          item.attr_vals = item.attr_vals.split(' ')
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 删除标签
    async handleClose (obj, index) {
      console.log(obj)
      obj.attr_vals.splice(index, 1)
      const attrstr = obj.attr_vals.join(' ')
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      try {
        await addParams({ id: this.id, attr_name: obj.attr_name, attr_sel: 'many', attr_vals: attrstr, attr_id: obj.attr_id })
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 显示标签
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 增加标签
    async handleInputConfirm (obj) {
      const inputValue = this.inputValue
      if (inputValue) {
        console.log(obj.attr_vals)
        console.log(this.inputValue)
        obj.attr_vals.push(this.inputValue)
        const attrstr = obj.attr_vals.join(' ')
        console.log(attrstr)
        try {
          await addParams({ id: this.id, attr_name: obj.attr_name, attr_sel: 'many', attr_vals: attrstr, attr_id: obj.attr_id })
          this.$message.success('创建成功')
        } catch (err) {
          console.log(err)
        }
      }
      console.log(obj)

      this.inputVisible = false
      this.inputValue = ''
    },
    // 添加动态参数
    async addActParams () {
      this.dialogVisible = false
      await toAddParams({ id: this.id, attr_name: this.form.activeParams, attr_sel: 'many', attr_vals: '' })
      this.updateList()
    },
    // 删除动态参数
    async delActParamas (obj) {
      console.log(obj)
      try {
        await delParams({ id: obj.cat_id, attrId: obj.attr_id })
        this.updateList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    addStaParams () {
      this.dialogVisible = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
