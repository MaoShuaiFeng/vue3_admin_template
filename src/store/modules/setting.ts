//小仓库：layout组件相关的配置
import { defineStore } from "pinia";

const useLayOutSettingStore = defineStore("LayoutSetting", {
  state: () => {
    return {
      //是否折叠
      isCollapse: false,
    };
  },
});
export default useLayOutSettingStore;
