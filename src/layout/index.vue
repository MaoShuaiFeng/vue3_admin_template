<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ collapse: layoutSettingStore.isCollapse }"
    >
      <CLogo></CLogo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :default-active="$route.name"
          :collapse="layoutSettingStore.isCollapse"
          :collapse-transition="false"
        >
          <CMenu :menuList="userStore.menuRoutes"></CMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部菜单 -->
    <div
      class="layout_tabbar"
      :class="{ collapse: layoutSettingStore.isCollapse }"
    >
      <CTabbar></CTabbar>
    </div>
    <!-- 内容展示区 -->
    <div
      class="layout_main"
      :class="{ collapse: layoutSettingStore.isCollapse }"
    >
      <CMain></CMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CLogo from "@/layout/logo/index.vue";
import CMenu from "@/layout/menu/index.vue";
import CMain from "@/layout/main/index.vue";
import CTabbar from "@/layout/tabbar/index.vue";
//获取用户相关小仓库
import useUserStore from "@/store/modules/user";
//获取layout配置相关的仓库
import useLayOutSettingStore from "@/store/modules/setting";
let userStore = useUserStore();
let layoutSettingStore = useLayOutSettingStore();

let $route = useRoute();
</script>
<script lang="ts">
export default {
  name: "CLayout",
};
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  & {
    --el-menu-text-color: rgb(255, 255, 255);
    --el-menu-bg-color: transparent;
    --el-menu-hover-bg-color: rgb(140, 146, 230);
    --el-menu-active-color: rgb(2, 26, 29);
  }

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    // background-color: $base-menu-background;
    // background-image: linear-gradient(to top, #0fd3d3 0%, #330867 100%);
    background: url("../assets/images/slider-bg.png") no-repeat;
    background-size: cover;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }

    &.collapse {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;

    &.collapse {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.collapse {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
