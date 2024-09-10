import type { App, Component } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // 引入element-plus图标
// import SvgIcon from "./SvgIcon/index.vue";
import Category from "./Category/index.vue";

const components: { [name: string]: Component } = { Category };

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
    // 引入element-plus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
