//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes";
//创建路由器
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  //滚动行为
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
