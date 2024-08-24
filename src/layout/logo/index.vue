<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <transition name="fade">
      <p v-if="!layoutSettingStore.isCollapse">{{ setting.title }}</p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting";
//获取layout配置相关的仓库
import useLayOutSettingStore from "@/store/modules/setting";
let layoutSettingStore = useLayOutSettingStore();
</script>
<script lang="ts">
export default {
  name: "CLogo",
};
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
.fade-enter-from {
  opacity: 0;
  scale: 0;
}
.fade-enter-active {
  transition: all .3s;
}
.fade-enter-to {
  opacity: 1;
  scale: 1;
}
</style>
