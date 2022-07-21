<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://liufusong.top:8899/api/private/v1/upload"
      :on-success="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      fileList: [],
      pics: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (response, file, fileList) {
      console.log(response, file, fileList)
      const obj = { name: file.name, url: file.url }
      this.fileList.push(obj)
      this.pics.push(file.url)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
