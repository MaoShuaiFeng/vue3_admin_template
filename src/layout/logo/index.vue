<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting";
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-menu-logo-font-size;
    margin-left: 15px;
  }
}
</style>
