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
    @click="changeFullScreen"
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
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userLogoutFn">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import useLayOutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";

let $router = useRouter();
let $route = useRoute();

let layoutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();

let isFullScreen = ref(document.fullscreenElement);

const changeIsFullScreen = () => {
  isFullScreen.value = document.fullscreenElement;
};

const KeyDown = (event: KeyboardEvent) => {
  // 监听按键事件
  // 如果按下了F11
  if (event.key === "F11") {
    event.preventDefault();
    changeFullScreen();
  }
};

window.addEventListener("keydown", KeyDown, true); // 监听按键事件
window.addEventListener("resize", changeIsFullScreen, false);

// 点击全屏
// 定义一个全屏函数
const changeFullScreen = () => {
  // 获取当前是否处于全屏状态
  // 如果不处于全屏状态
  if (!isFullScreen.value) {
    // 请求全屏
    document.documentElement.requestFullscreen();
  } else {
    // 否则退出全屏
    document.exitFullscreen();
  }
};

onBeforeUnmount(() => {
  // 卸载事件监听
  window.removeEventListener("keydown", KeyDown);
  window.removeEventListener("resize", changeIsFullScreen);
});

//点击更新
const updateRefreshFn = () => {
  layoutSettingStore.isRefresh = !layoutSettingStore.isRefresh;
};

// 退出登录
// 发请求退出登录,清除token,跳转到登录页
const userLogoutFn = async () => {
  await userStore.userLogoutFn();
  $router.push({ path: "/login", query: { redirect: $route.fullPath } });
};
</script>
<script lang="ts">
export default {
  name: "CSetting",
};
</script>

<style scoped></style>
