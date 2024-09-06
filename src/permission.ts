//路由鉴权
import router from "@/router";
//进度条插件----安装nprogress，引入进度条样式
//@ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });

// 获取用户小仓库内部的token，去判断用户是否成功登录
import useUserStore from "@/store/modules/user";
import pinia from "@/store";
const userStore = useUserStore(pinia);

import setting from "./setting";
import { ElNotification } from "element-plus";

//全局守卫：全局任意路由切换都会触发
// 全局前置守卫
// to: 要跳转到的路由对象
// from: 从哪个路由离开
// next: 函数，放行
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + "-" + to.meta.title; //设置页面标题
  nprogress.start();
  const token = userStore.token;
  const username = userStore.username;
  if (token) {
    if (to.path == "/login") {
      next({ path: "/home" });
    } else {
      // 用户登录了,有用户信息再放行，没有就获取用户信息
      if (username) {
        next();
      } else {
        try {
          await userStore.getUserInfo();
          next({ ...to });
        } catch (error) {
          // token过期，删除token，跳转到登录页
          ElNotification.error("登录信息已过期，请重新登录");
          console.error("捕获到错误:", error);
          await userStore.userLogoutFn();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});
