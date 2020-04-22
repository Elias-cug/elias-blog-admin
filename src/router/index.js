import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/createArticle',
    component: Layout,
    hidden: false,
    redirect: '/createArticle/index',
    meta: { title: '文章创作', icon: '' },
    children: [{
      path: 'index',
      name: 'CreateArticle',
      hidden: false,
      component: () => import('@/views/createArticle/index.vue'),
      meta: { title: '富文本编辑', icon: '' }
    }, {
      path: 'markdown',
      name: 'Markdown',
      hidden: false,
      component: () => import('@/views/createArticle/markdown.vue'),
      meta: { title: 'Markdown', icon: '' }
    }]
  },
  {
    path: '/blogManage',
    component: Layout,
    redirect: '/blogManage/articleManage',
    hidden: false,
    meta: { title: '文章管理', icon: '' },
    children: [{
      path: 'articleManage',
      name: 'ArticleManage',
      hidden: false,
      component: () => import('@/views/articleManage/index.vue'),
      meta: { title: '文章管理', icon: '' }
    }, {
      path: 'categoryManage',
      name: 'CategoryManage',
      hidden: false,
      component: () => import('@/views/categoryManage/index.vue'),
      meta: { title: '分类管理', icon: '' }
    }, {
      path: 'moudleManage',
      name: 'MoudleManage',
      hidden: false,
      component: () => import('@/views/moudleManage/index.vue'),
      meta: { title: '模块管理', icon: '' }
    }]
  }, {
    path: '/visit',
    component: Layout,
    redirect: '/visit/index',
    hidden: false,
    children: [{
      path: 'index',
      name: 'Visit',
      hidden: false,
      component: () => import('@/views/visit/index.vue'),
      meta: { title: '访问流量', icon: '' }
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
