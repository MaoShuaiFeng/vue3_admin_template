// main.ts
import { createApp } from "vue"; // 从vue中导入createApp
import ElementPlus from "element-plus"; // 从element-plus中导入ElementPlus
import "element-plus/dist/index.css"; // 导入element-plus的css样式
import App from "./App.vue"; // 从App.vue中导入App
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "virtual:svg-icons-register"; //svg插件需要配置代码
import GlobalComponent from "./components"; //引入自定义插件：注册整个项目的全局组件
import "./style/index.scss"; // 导入全局样式
import router from "./router"; //引入路由
import pinia from "./store"; //引入仓库
import "@/permission.ts"; //路由鉴权
import 'element-plus/theme-chalk/dark/css-vars.css' //引入暗黑模式
import { isHasButton } from "./directive/has";

const app = createApp(App); // 使用createApp创建一个vue实例

isHasButton(app); //注册全局指令

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(GlobalComponent)
  .use(router)
  .use(pinia);

app.mount("#app"); // 将vue实例挂载到id为app的元素上
