import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/Layout/Layout.vue'

Vue.use(VueRouter)

export const routes = [
  // {
  //   path: '',
  //   name: 'home',
  //   component: layout,
  //   redirect: '/governanceReport',
  //   children: [
  //     {
  //       path: '/governanceReport',
  //       component: () =>
  //         import('@/views/GovernanceReport/GovernanceReport.vue'),
  //       meta: { name: '首页', icon: 's-home' }
  //     }
  //   ]
  // },
  {
    path: '',
    name: 'home',
    component: layout,
     redirect: '/governanceReport',
    children: [
      {
        path: '/governanceReport',
        component: () =>
          import('@/views/GovernanceReport/GovernanceReport.vue'),
        meta: { name: '政务报道', icon: 's-custom' }
      }
    ]
  },
  // {
  //   path: '',
  //   name: 'mediaHotspots',
  //   component: layout,
  //   children: [
  //     {
  //       path: '/mediaHotspots',
  //       component: () => import('@/views/MediaHotspots/MediaHotspots.vue'),
  //       meta: { name: '媒体热点', icon: 'hot-water' }
  //     }
  //   ]
  // },
  {
    path: '',
    name: 'thematicAnalysis',
    component: layout,
    children: [
      {
        path: '/thematicAnalysis',
        component: () =>
          import('@/views/ThematicAnalysis/ThematicAnalysis.vue'),
        meta: { name: '专题分析', icon: 'search' }
      }
    ]
  },
  {
    path: '',
    name: 'regionNews',
    component: layout,
    children: [
      {
        path: '/regionNews',
        component: () => import('@/views/RegionNews/RegionNews.vue'),
        meta: { name: '地域新闻', icon: 'map-location' }
      }
    ]
  },
  // {
  //   path: '',
  //   name: 'propagationPath',
  //   component: layout,
  //   children: [
  //     {
  //       path: '/propagationPath',
  //       component: () => import('@/views/RegionNews/RegionNews.vue'),
  //       meta: { name: '传播路径', icon: 'share' }
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
