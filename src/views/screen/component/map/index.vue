<template>
  <div ref="map" class="map"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import * as china from "./china.json";

let map = ref(null);
echarts.registerMap("china", china as any);

onMounted(() => {
  let myMap = echarts.init(map.value);
  myMap.setOption({
    geo: {
      map: "china",
      roam: true,
      label: {
        show: true,
        color: "white",
      },
      left: 20,
      right: 10,
      top: 50,
      bottom: 0,
      itemStyle: {
        // color: "#2E32A8",
        areaColor: "#3F45EC",
        borderColor: "#00DAFF",
        shadowColor: "#00DAFF",
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowBlur: 20,
        borderWidth: 2,
        borderType: "solid",
        opacity: 0.8,
      },
      emphasis: {
        label: {
          show: true,
          color: "white",
          fontSize: 20,
        },
        itemStyle: {
          areaColor: "#8B8EF2",
        },
      },
    },
    series: [
      {
        type: "lines",
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [87.617733, 43.792818], // 终点
            ],
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
          },
          {
            coords: [
              [115.892151, 28.676493],
              [116.405285, 39.904989],
            ],
          },
        ],
        effect: {
          show: true,
          symbol: "image://https://maoshuaifeng.github.io/blog/logo.svg",
          period: 4,
          trailLength: 0.02,
          color: "#00DAFF",
          symbolSize: 15,
        },
        // 统一的样式设置
        lineStyle: {
          color: "#00DAFF",
          width: 1,
          type: "dashed",
          curveness: 0.5,
          opacity: 0.5,
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
</style>
