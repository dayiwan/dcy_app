import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/Layout/Layout.vue';

Vue.use(VueRouter)

export const routes = [{
    path: '',
    name: 'home',
    component: layout,
    children: [{
        path: '/home',
        component: () =>
            import ('@/views/Home/Home.vue'),
        meta: { name: '首页', icon: 's-home' }
    }]
}, {
    path: '',
    name: 'index',
    component: layout,
    children: [{
        path: '/dataResource',
        component: () =>
            import ('@/views/DataResource/DataResource.vue'),
        meta: { name: '数据资源', icon: 's-grid' }
    }]
}]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router