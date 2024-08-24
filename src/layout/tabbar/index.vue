<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <CBreadcrumb />
    </div>
    <div class="tabbar-right">
      <CSetting />
    </div>
  </div>
</template>

<script setup lang="ts">
import CBreadcrumb from "@/layout/tabbar/breadcrumb/index.vue";
import CSetting from "@/layout/tabbar/setting/index.vue";
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
