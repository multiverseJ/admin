<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div class="left">
        <div class="logo"><img src="@/assets/logo.jpeg" alt="" /></div>
        <h1>后台管理系统</h1>
      </div>
      <el-button class="exit" @click="$router.push('/login')">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" ref="aside">
        <div class="stretch" @click="onClick">
          <span
            :class="asideExtend ? 'el-icon-caret-left' : 'el-icon-caret-right'"
          ></span>
        </div>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          :collapse="!asideExtend"
        >
          <el-submenu
            :index="item.order + ''"
            v-for="(item, i) in menu"
            :key="item.id"
          >
            <template #title>
              <i :class="iconArr[i]"></i>
              {{ asideExtend ? item.authName : "" }}
            </template>
            <el-menu-item
              v-for="obj in item.children"
              :key="obj.id"
              index="1-1"
              @click="
                $router.push(
                  { path: `/${obj.path}` },
                  (onComplete) => {},
                  (onAbort) => {}
                )
              "
            >
              <i class="el-icon-menu"></i>
              {{ obj.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 显示页面 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menuRight } from '@/api/right'
export default {
  created () {
    this.menuRight()
  },
  data () {
    return {
      asideExtend: true,
      menu: [],
      iconArr: ['el-icon-user-solid', 'el-icon-s-help', 'el-icon-s-goods', 'el-icon-s-order', 'el-icon-s-claim']
    }
  },
  methods: {
    onClick () {
      // console.log(this.$refs.aside.$el.style)

      if (this.$refs.aside.$el.style.width === '200px') {
        this.$refs.aside.$el.style = 'width:64px'
        this.asideExtend = false
      } else {
        this.$refs.aside.$el.style = 'width:200px'
        this.asideExtend = true
      }
    },
    async menuRight () {
      try {
        const res = await menuRight()
        console.log(res)
        this.menu = res.data.data
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

<style scoped lang="less">
// 头部
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .logo {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h1 {
      font-size: 22px;
      color: #fff;
      margin-left: 10px;
    }
  }
  .exit {
    height: 40px;
  }
}
// 侧边栏
.stretch {
  width: 100%;
  height: 40px;
  background-color: #008cff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
    transition: none;
  }
}
.main{
  height: 94vh;
}
</style>
