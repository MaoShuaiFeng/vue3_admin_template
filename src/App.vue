<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- 路由组件出口位置 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout以及路由的子路由 -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.fade-enter-active {
  transition: all 0.1s ease;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
