<template>
  <!-- 左侧图标 -->
  <el-icon @click="changeIconFn" style="margin-right: 10px">
    <component
      :is="layoutSettingStore.isCollapse ? 'Expand' : 'Fold'"
    ></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      v-show="item.meta.title"
      :key="index"
      :to="item.path"
    >
      <!-- 显示标题 -->
      <el-icon style="margin: 0 5px; vertical-align: bottom">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";
//获取配置仓库
let layoutSettingStore = useLayOutSettingStore();
//点击切换图标
const changeIconFn = () => {
  layoutSettingStore.isCollapse = !layoutSettingStore.isCollapse;
};
let $route = useRoute();
</script>
<script lang="ts">
export default {
  name: "CBreadcrumb",
};
</script>

<style scoped></style>
