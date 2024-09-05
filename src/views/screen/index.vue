<template>
  <div class="container">
    <div ref="screen" class="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Top from "./component/top/index.vue";
//获取数据大屏展示内容的dom元素
let screen = ref();

const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w;
  let wh = window.innerHeight / h;
  let scale = ww < wh ? ww : wh;
  return scale;
};
onMounted(() => {
  //获取屏幕的缩放比例
  let scale = getScale();
  //设置屏幕的缩放比例
  screen.value.style.transform = `scale(${scale}) translate(-50%, -50%)`;
});

window.onresize = () => {
  //获取屏幕的缩放比例
  let scale = getScale();
  //设置屏幕的缩放比例
  screen.value.style.transform = `scale(${scale}) translate(-50%, -50%)`;
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
}
.screen {
  position: fixed;
  width: 1920px;
  height: 1080px;
  left: 50%;
  top: 50%;
  transform-origin: left top;

  .top {
    width: 100%;
    height: 40px;
  }

  .bottom {
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    .left {
      flex: 1;
    }
    .center {
      flex: 2;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
