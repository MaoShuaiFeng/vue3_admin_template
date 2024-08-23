// main.ts
import { createApp } from "vue"; // 从vue中导入createApp
import ElementPlus from "element-plus"; // 从element-plus中导入ElementPlus
import "element-plus/dist/index.css"; // 导入element-plus的css样式
import App from "./App.vue"; // 从App.vue中导入App
import zhCn from "element-plus/es/locale/lang/zh-cn";

import "virtual:svg-icons-register"; //svg插件需要配置代码

import GlobalComponent from "./components";

const app = createApp(App); // 使用createApp创建一个vue实例

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(GlobalComponent);

app.mount("#app"); // 将vue实例挂载到id为app的元素上
