<template>
  <div>
    <div class="attributes" v-for="item in attributesList" :key="item.attr_id">
      <p>{{item.attr_name}}</p>
      <el-input v-model="item.attr_vals"></el-input>
    </div>
  </div>
</template>

<script>
import { getParamsList } from '@/api/goods'
export default {
  props: {
    id: {
      type: [Number, String]
    }
  },
  created () {
    this.getParamsList()
  },
  data () {
    return {
      attributesList: []
    }
  },
  methods: {
    async getParamsList () {
      const res = await getParamsList({ id: this.id, sel: 'only' })
      console.log(res)
      this.attributesList = res.data.data
    }
  },
  computed: {},
  watch: {
    id () {
      this.getParamsList()
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
p {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
}
.el-input{
  margin-bottom: 20px;
}
</style>
