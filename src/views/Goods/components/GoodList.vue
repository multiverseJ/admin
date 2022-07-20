<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <div class="adduser">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="7"
            ><el-button type="primary" @click="$router.push('/goods/add')"
              >添加商品</el-button
            ></el-col
          >
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table
        :data="goodsList"
        style="width: 100%"
        stripe
        border
        class="table"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          :formatter="dateForma"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editUserFn(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deletefn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-size="pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <EditForm
      :editShow.sync="editGoodsShow"
      :editForm="editForm"
      :rules="rules"
      @updateList="getGoodsList(1, 10)"
      @editSubmit="editGoodsSubmit"
    ></EditForm>
  </div>
</template>

<script>
import { username, password, email, mobile } from '@/utils/validate'
import EditForm from '@/components/EditForm'
import moment from 'moment'
import { getGoodsList, editGoods, deleteGoods } from '@/api/goods'
export default {
  created () {
    this.getGoodsList(1, 10)
  },
  data () {
    return {
      input: '',
      goodsList: [],
      pagenum: 1,
      pagesize: 10,
      editGoodsShow: false,
      editForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_id: '',
        id: '',
        catName: ''
      },
      rules: { username, password, email, mobile },
      total: 0
    }
  },
  methods: {
    // 获取商品列表
    async getGoodsList (pagenum, pagesize) {
      const res = await getGoodsList({ pagenum, pagesize })
      console.log(res)
      this.goodsList = res.data.data.goods
      this.total = res.data.data.total
      this.pagenum = +res.data.data.pagenum
    },
    // 时间格式化
    dateForma (row, column, data) {
      return moment.unix(data).format('YYYY-MM-DD')
    },
    // 编辑用户
    editUserFn (val) {
      this.editGoodsShow = true
      console.log(val)
      this.editForm.goods_name = val.goods_name
      this.editForm.goods_price = val.goods_price
      this.editForm.catName = val.goods_name
      this.editForm.id = val.goods_id
    },
    async editGoodsSubmit (editForm) {
      console.log(editForm)
      try {
        const res = await editGoods(editForm)
        // 获取新添加用户信息
        console.log(res)
        // this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      }
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
        await deleteGoods(val.goods_id)
        this.getGoodsList(1, 10)
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
    // 分页
    handleSizeChange (val) {
      this.pagesize = val
      this.getGoodsList(this.pagenum, this.pagesize)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getGoodsList(this.pagenum, this.pagesize)

      console.log(`当前页: ${val}`)
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
</style>
