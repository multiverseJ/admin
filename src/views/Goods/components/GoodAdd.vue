<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 消息提示 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 进程条 -->
      <el-steps :active="active" finish-status="success" class="steps">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <el-tabs
        :tab-position="tabPosition"
        @tab-click="changefn"
        :before-leave="fn"
      >
        <el-tab-pane label="基本信息">
          <BasisMessage @validatefn="validInfoFn" ref="basis"></BasisMessage>
        </el-tab-pane>
        <el-tab-pane label="商品参数" lazy>
          <GoodsParam :id="cat_id"></GoodsParam>
        </el-tab-pane>
        <el-tab-pane label="商品属性" lazy>
          <GoodsAttributes :id="cat_id"></GoodsAttributes>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <GoodsImage></GoodsImage>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <GoodsContent @submit="submitFn"></GoodsContent>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { submitGoods } from '@/api/goods.js'
import BasisMessage from './components/BasisMessage'
import GoodsParam from './components/GoodsParam'
import GoodsAttributes from './components/GoodsAttributes'
import GoodsImage from './components/GoodsImage'
import GoodsContent from './components/GoodsContent'
export default {
  created () { },
  data () {
    return {
      active: 0,
      tabPosition: 'left',
      valid: true,
      cat_id: null,
      form: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_introduce: '',
        goods_cat: '',
        attrs: [],
        pics: []
      }
    }
  },
  methods: {
    changefn (tab) {
      if (!this.valid) return this.$message.error('请完整填写表单')
      this.active = +tab.index
      this.cat_id = this.$refs.basis.value[2]
      // console.log(this.cat_id)
      this.form.goods_cat = this.$refs.basis.value.join(',')
      // console.log(this.form.goods_cat)
    },
    fn () {
      if (!this.valid) return false
      // this.cat_id = this.$refs.basis.value
    },
    validInfoFn (flag, form) {
      this.valid = flag
      this.form = { ...this.form, ...form }
      console.log(this.form)
    },
    // 提交
    async submitFn (quill) {
      this.form.goods_introduce = quill
      try {
        await submitGoods(this.form)
        this.$message.success('创建成功')
        this.$router.push('/goods')
      } catch (err) {
        this.$message.error('创建失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BasisMessage, GoodsParam, GoodsAttributes, GoodsImage, GoodsContent }

}
</script>

<style scoped lang="less">
.box-card {
  margin-top: 20px;
}
.steps {
  margin: 15px 0;
}
</style>
