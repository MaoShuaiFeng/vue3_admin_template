//对外暴露配置路由
export const constantRoutes = [
  {
    path: "/login",
    name: "login", //命名路由
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  // 匹配所有未找到的路由，重定向到404页面
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "notFound",
  },
];
