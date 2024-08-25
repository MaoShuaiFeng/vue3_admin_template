<template>
  <!-- 刷新 -->
  <el-button
    @click="updateRefreshFn"
    size="small"
    icon="Refresh"
    circle
  ></el-button>
  <!-- 全屏 -->
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreenFn"
  ></el-button>
  <!-- 设置 -->
  <el-button size="small" icon="Setting" circle></el-button>
  <!-- 头像 -->
  <img
    :src="userStore.avatar"
    style="width: 23px; height: 23px; margin: 0 14px; border-radius: 50%"
    alt="Avatar"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";

let layoutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
//点击更新
const updateRefreshFn = () => {
  layoutSettingStore.isRefresh = !layoutSettingStore.isRefresh;
};
// 点击全屏
// 定义一个全屏函数
const fullScreenFn = () => {
  // 获取当前是否处于全屏状态
  let isFullScreen = document.fullscreenElement;
  // 如果不处于全屏状态
  if (!isFullScreen) {
    // 请求全屏
    document.documentElement.requestFullscreen();
  } else {
    // 否则退出全屏
    document.exitFullscreen();
  }
};
</script>
<script lang="ts">
export default {
  name: "CSetting",
};
</script>

<style scoped></style>
