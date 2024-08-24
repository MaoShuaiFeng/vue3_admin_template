import SvgIcon from "./SvgIcon/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // 引入element-plus图标
import type { App, Component } from "vue";
const components: { [name: string]: Component } = { SvgIcon };
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
    // 引入element-plus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
};
