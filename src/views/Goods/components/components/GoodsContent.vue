<template>
  <div>
    <!-- 富文本编辑器 -->
    <quill-editor v-model="quill"></quill-editor>
    <el-button type="primary" @click="addGoodsBtn">添加商品</el-button>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      quill: ''
    }
  },
  methods: {
    addGoodsBtn () {
      this.$emit('submit', this.quill)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
}
</script>

<style scoped>
:deep(.ql-editor) {
  height: 300px;
}
</style>
