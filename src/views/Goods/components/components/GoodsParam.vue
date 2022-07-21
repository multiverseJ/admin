<template>
  <div>
    <div class="params" v-for="item in paramsList" :key="item.attr_id">
      <p>{{ item.attr_name }}</p>
      <el-checkbox-group v-model="item.attr_status" @change="fn">
      <el-checkbox

        :label="obj"
        border
        v-for="(obj, index) in item.attr_vals"
        :key="index"
        checked

      ></el-checkbox>
      </el-checkbox-group>
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
      sel: 'many',
      paramsList: [],
      checked1: [],
      valList: []
    }
  },
  methods: {
    async getParamsList () {
      const res = await getParamsList({ id: +this.id, sel: this.sel })
      console.log(res)
      this.paramsList = res.data.data
      this.paramsList.forEach((item) => {
        item.attr_vals = item.attr_vals.split(' ')
        this.$set(item, 'attr_status', [])
      })
      console.log(this.paramsList)
    },
    fn (a) {
      console.log(a)
    }
  },
  computed: {

  },
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
  margin-bottom: 10px;
}
.el-checkbox {
  margin-right: 0;
  margin-bottom: 5px;
}
.params {
  margin-bottom: 30px;
}
</style>
