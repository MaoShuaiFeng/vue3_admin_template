<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">1</div>
    <!-- 顶部菜单 -->
    <div class="layout_tabbar">2</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
        <p style="height: 10000px;background-color: red;">123</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: red;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
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
