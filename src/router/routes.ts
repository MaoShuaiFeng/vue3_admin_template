//对外暴露配置路由
export const constantRoutes = [
  {
    path: "/login",
    name: "Login", //命名路由
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true, //是否隐藏路由
    },
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/home", //重定向
    component: () => import("@/layout/index.vue"),
    meta: {
      hidden: false,
    },
    children: [
      {
        path: "home",
        name: "Home",
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
    name: "NotFound",
    meta: {
      title: "notFound",
      hidden: true,
    },
  },
  //数据大屏
  {
    path: "/screen",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },
  //商品管理
  {
    path: "/product",
    name: "Product",
    redirect: "/product/attr",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    children: [
      {
        path: "attr",
        name: "Attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "IceTea",
        },
      },
      {
        path: "sku",
        name: "Sku",
        component: () => import("@/views/product/sku/index.vue"),
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "Lollipop",
        },
      },
      {
        path: "spu",
        name: "Spu",
        component: () => import("@/views/product/spu/index.vue"),
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Box",
        },
      },
      {
        path: "trademark",
        name: "Trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "Coin",
        },
      },
    ],
  },
  // 权限管理
  {
    path: "/acl",
    name: "Acl",
    redirect: "/acl/user",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "Bowl",
        },
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Pointer",
        },
      },
    ],
  },
];
