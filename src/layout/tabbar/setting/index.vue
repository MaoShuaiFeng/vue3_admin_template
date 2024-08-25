<template>
  <!-- 刷新 -->
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefreshFn"
  ></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    src="/vite.svg"
    style="width: 23px; height: 23px; margin: 0 14px"
    alt="Avatar"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
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
let layoutSettingStore = useLayOutSettingStore();
const updateRefreshFn = () => {
  layoutSettingStore.isRefresh = !layoutSettingStore.isRefresh;
};
</script>
<script lang="ts">
export default {
  name: "CSetting",
};
</script>

<style scoped></style>
