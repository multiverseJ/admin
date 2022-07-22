<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
        style="width: 200px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 表格 -->
      <el-table :data="bookList" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="trade_no" label="是否付款">
          <template >
            <el-button type="danger" size="mini">未支付</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column
          prop="create_time"
          label="下单时间"
          :formatter="dateForma"
        ></el-table-column>
        <el-table-column prop="create_time" label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import { getBookList } from '@/api/book'
export default {
  created () {
    this.getBookList()
  },
  data () {
    return {
      bookList: [],
      input: '',
      bookObj: {
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    async getBookList () {
      try {
        const res = await getBookList(this.bookObj)
        this.bookList = res.data.data.goods
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 时间格式化
    dateForma (row, column, data) {
      return moment.unix(data).format('YYYY-MM-DD')
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
</style>
