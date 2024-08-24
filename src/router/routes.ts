//对外暴露配置路由
export const constantRoutes = [
  {
    path: "/login",
    name: "login", //命名路由
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true, //是否隐藏路由
    },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "layout",
      hidden: false,
      icon: "Promotion",
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled", //图标,支持element-plus的图标库图标
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
    },
  },
  // 匹配所有未找到的路由，重定向到404页面
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "notFound",
    meta: {
      title: "notFound",
      hidden: true,
    },
  },
];
