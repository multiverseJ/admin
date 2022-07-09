import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Home/Welcome.vue')
      },
      {
        path: '/users',
        component: () => import('@/views/User')
      },
      {
        path: '/rights',
        component: () => import('@/views/Right')
      },
      {
        path: '/roles',
        component: () => import('@/views/Right/components/Roles.vue')
      },
      {
        path: '/roles',
        component: () => import('@/views/Right/components/Roles.vue')
      },
      {
        path: '/goods',
        component: () => import('@/views/Goods/components/GoodList.vue')
      },
      {
        path: '/params',
        component: () => import('@/views/Goods/components/ClassParam.vue')
      },
      {
        path: '/categories',
        component: () => import('@/views/Goods/components/GoodClass.vue')
      },
      {
        path: '/orders',
        component: () => import('@/views/Book/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
