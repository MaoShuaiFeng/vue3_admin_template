//路由鉴权
import router from "@/router";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
//全局守卫：全局任意路由切换都会触发
// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // to: 要跳转到的路由对象
  // from: 从哪个路由离开
  // next: 函数，放行
  nprogress.start();
  next();
});
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});
//进度条插件----安装nprogress
