<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <CLogo></CLogo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu>
          <CMenu :menuList="userStore.menuRoutes"></CMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部菜单 -->
    <div class="layout_tabbar">2</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <p style="height: 10000px; background-color: red">123</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CLogo from "@/layout/logo/index.vue";
import CMenu from "@/layout/menu/index.vue";
//获取用户相关小仓库C
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: red;

  & {
    --el-menu-text-color: rgb(188, 188, 230);
    --el-menu-bg-color: rgb(62, 62, 119);
    --el-menu-hover-bg-color: rgb(80, 89, 219);
    --el-menu-active-color: white;
  }

  .el-menu-item.is-active {
    background-color: #247bb4;
  }

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: green;
  }
  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellow;
    padding: 20px;
    overflow: auto;
  }
}
</style>
