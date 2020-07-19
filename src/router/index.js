import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const routerMap = {
  table: () => import('@/views/table/index.vue'),
  layout: Layout
}

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: false,
    redirect: '/createArticle/index',
    meta: { title: '文章创作', icon: '' },
    children: [{
      path: '',
      name: 'CreateArticle',
      hidden: false,
      component: () => import('@/views/createArticle/tinymce.vue'),
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
  },
  {
    path: '/timelineManage',
    component: Layout,
    redirect: '/timelineManage/index',
    hidden: false,
    meta: { title: '时间线管理', icon: '' },
    children: [{
      path: '',
      name: 'timelineManage',
      hidden: false,
      component: () => import('@/views/timelineManage/index.vue'),
      meta: { title: '时间线管理', icon: '' }
    }]
  },
  {
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
  },
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload/index',
    hidden: false,
    children: [{
      path: 'index',
      name: 'Upload',
      hidden: false,
      component: () => import('@/views/upload/index.vue'),
      meta: { title: '文件上传', icon: '' }
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
