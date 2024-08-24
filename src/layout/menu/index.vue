<template>
  <template v-for="item in menuList" :key="item.name">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        @click="goRoute"
        :index="item.name"
      >
        <svg-icon :name="item.meta.icon"></svg-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有且只有一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
        :index="item.children[0].name"
      >
        <svg-icon :name="item.children[0].meta.icon"></svg-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个子路由 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.name"
    >
      <template #title>
        <svg-icon :name="item.meta.icon"></svg-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件 -->
      <CMenu :menuList="item.children"></CMenu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
  useRouter,
} from "vue-router";
//获取父组件传递过来的路由数组
defineProps(["menuList"]);

const $router = useRouter();
//点击菜单回调
const goRoute = (vc: {
  index: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}) => {
  $router.push({ name: String(vc.index) });
};
</script>

<script lang="ts">
export default {
  name: "CMenu",
};
</script>

<style scoped lang="scss">
 .el-menu-item.is-active {
    background-color: rgb(140, 146, 230);
  }
</style>
