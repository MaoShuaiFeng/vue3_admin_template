// main.ts
import { createApp } from "vue"; // 从vue中导入createApp
import ElementPlus from "element-plus"; // 从element-plus中导入ElementPlus
import "element-plus/dist/index.css"; // 导入element-plus的css样式
import App from "./App.vue"; // 从App.vue中导入App
import zhCn from "element-plus/es/locale/lang/zh-cn";
const app = createApp(App); // 使用createApp创建一个vue实例
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app"); // 将vue实例挂载到id为app的元素上
