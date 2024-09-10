<template>
  <!-- 路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade" appear mode="out-in" position="absolute">
      <!-- 渲染layout以及路由的子路由 -->
      <component :is="Component" v-if="isDestroy" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
import { ref, watch, nextTick } from "vue";

let layoutSettingStore = useLayOutSettingStore();

//控制当前组件是否销毁重建
let isDestroy = ref(true);

//监听用户是否刷新页面
watch(
  () => layoutSettingStore.isRefresh,
  () => {
    isDestroy.value = false;
    nextTick(() => {
      isDestroy.value = true;
    });
  }
);
</script>
<script lang="ts">
export default {
  name: "CMain",
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
