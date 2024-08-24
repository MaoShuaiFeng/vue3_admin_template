<template>
  <!-- 左侧图标 -->
  <el-icon @click="changeIconFn" style="margin-right: 10px">
    <component
      :is="layoutSettingStore.isCollapse ? 'Expand' : 'Fold'"
    ></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
//获取配置仓库
let layoutSettingStore = useLayOutSettingStore();
//点击切换图标
const changeIconFn = () => {
  layoutSettingStore.isCollapse = !layoutSettingStore.isCollapse;
};
</script>
<script lang="ts">
export default {
  name: "CBreadcrumb",
};
</script>

<style scoped></style>
