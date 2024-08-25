//小仓库：layout组件相关的配置
import { defineStore } from "pinia";

const useLayOutSettingStore = defineStore("LayoutSetting", {
  state: () => {
    return {
      //是否折叠
      isCollapse: false,
      //刷新状态
      isRefresh: false,
    };
  },
});
export default useLayOutSettingStore;
