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
          <BasisMessage @validatefn="valid = $event"></BasisMessage>
        </el-tab-pane>
        <el-tab-pane label="商品参数">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片">角色管理</el-tab-pane>
        <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import BasisMessage from './components/BasisMessage'
export default {
  created () { },
  data () {
    return {
      active: 0,
      tabPosition: 'left',
      valid: true
    }
  },
  methods: {
    changefn (tab) {
      if (!this.valid) return this.$message.error('请完整填写表单')
      this.active = +tab.index
    },
    fn () {
      if (!this.valid) return false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BasisMessage }

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
