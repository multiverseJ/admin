<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加用户</el-button>
      <!-- 表格 -->
      <el-table
        :data="classList"
        style="width: 100%"
        stripe
        border
        row-key="cat_id"
        class="table"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template>
            <i class="el-icon-success"></i>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.cat_level === 0
                  ? 'primary'
                  : scope.row.cat_level === 1
                  ? 'success'
                  : 'warning'
              "
              disable-transitions
              >{{
                scope.row.cat_level === 0
                  ? "一级"
                  : scope.row.cat_level === 1
                  ? "二级"
                  : "三级"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template >
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { goodsCategoriesList } from '@/api/goods'
export default {
  created () {
    this.goodsCategoriesList()
  },
  data () {
    return {
      pageObj: {
        pagenum: 1,
        pagesize: 4
      },
      total: null,
      classList: []
    }
  },
  methods: {
    async goodsCategoriesList () {
      try {
        const res = await goodsCategoriesList(this.pageObj)
        console.log(res)
        this.classList = res.data.data.result
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
.el-icon-success {
  color: green;
}
</style>
