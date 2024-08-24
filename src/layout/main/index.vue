<template>
  <!-- 路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout以及路由的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: "CMain",
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
