import { createRouter, createWebHashHistory } from 'vue-router' //引入vue-router-4.0
import type { RouteRecordRaw, Router } from 'vue-router' 


//项目静态路由表
export const constantRoutes:RouteRecordRaw[] = [
    {
        path:'/',
        redirect: '/login'

    },
    {
        path: '/login',
        component: () => import('../pages/Login/index.vue'),
    }
]

const router:Router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router