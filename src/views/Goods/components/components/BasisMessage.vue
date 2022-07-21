<template>
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="商品名称" prop="goods_name">
      <el-input v-model="form.goods_name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="goods_price">
      <el-input v-model="form.goods_price" type="number"></el-input>
    </el-form-item>
    <el-form-item label="商品重量" prop="goods_weight">
      <el-input v-model="form.goods_weight" type="number"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="goods_number">
      <el-input v-model="form.goods_number" type="number"></el-input>
    </el-form-item>
    <el-form-item label="商品分类" prop="select">
      <el-cascader
        v-model="value"
        :options="options"
        :props="{
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id',
        }"
        @change="handleChange"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
import { goodsCategoriesList } from '@/api/goods'
export default {
  name: 'BasisMessage',
  created () {
    this.goodsCategoriesList()
  },
  data () {
    const validFn = (rule, value, callback) => {
      this.value.length < 3 ? callback(new Error('请选择至三级')) : callback()
    }
    return {
      form: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0
      },
      rules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        select: [{ required: true, validator: validFn, trigger: 'change' }]
      },
      categoriesList: {
        type: '',
        pagenum: '',
        pagesize: ''
      },
      value: [],
      options: [],
      flag: null

    }
  },
  methods: {
    // 商品分类列表
    async goodsCategoriesList () {
      const res = await goodsCategoriesList()
      console.log(res)
      this.options = res.data.data
    },
    handleChange (value) {
      console.log(value)
    },
    // 表单校验
    validatefn () {
      this.$refs.form.validate((value) => {
        if (!value) this.flag = false
        else this.flag = true
      })
    }

  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {},
  updated () {
    this.validatefn()
    console.log(this.flag)

    if (this.flag) {
      this.$emit('validatefn', this.flag, this.form)
    } else {
      this.$emit('validatefn', this.flag)
    }
  }

}
</script>

<style scoped lang="less">
/deep/.el-form-item__label {
  float: none;
}
</style>
