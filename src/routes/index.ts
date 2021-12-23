import { createRouter, createWebHashHistory } from "vue-router"; //引入vue-router-4.0
import type { RouteRecordRaw, Router } from "vue-router";

//项目静态路由表
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../pages/login/index.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../pages/dashboard/index.vue"),
    children: [
      {
        path: "/dashboard/",
        redirect: "/dashboard/home",
      },
      {
        path: "/dashboard/home",
        name: "home",
        component: () => import("../pages/home/index.vue"),
      },
      {
        path: "/dashboard/table",
        name: "table",
        component: () => import("../pages/table/index.vue"),
      },
      {
        path: "/dashboard/404",
        name: "404",
        component: () => import("../pages/404/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("../pages/404/index.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
