<template>
  <div class="main">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="bg"></p>

      <!-- echarts图 -->
      <div ref="charts" class="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

let charts = ref(null);

onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {
      text: "景区排行",
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: 20,
      },
      subtext: "各大景区排行",
      subtextStyle: {
        color: "#fff",
        fontSize: 16,
      },
    },
    xAxis: {
      type: "category",
      data: ["云南", "四川", "重庆", "贵州", "西藏", "陕西"],

      axisLabel: {
        color: "#fff",
        fontSize: 16,
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {},
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 40,
      top: 30,
      bottom: 30,
      right: 30,
    },
    series: [
      {
        type: "bar",
        data: [
          { value: 320, name: "云南" },
          { value: 240, name: "四川" },
          { value: 149, name: "重庆" },
          { value: 100, name: "贵州" },
          { value: 59, name: "西藏" },
          { value: 39, name: "陕西" },
        ],
        label: {
          show: true,
          position: "top",
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          formatter: "{c}万",
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(47,112,224,.2)",
        },
        itemStyle: {
          color: "#00DAFF",
          borderRadius: [10, 10, 0, 0],
        },
        barWidth: 30,
        barGap: "30%",
        emphasis: {
          itemStyle: {
            color: "#2F70E0",
          },
        },
        z: 10,
        animationDuration: 1500,
        animationEasing: "cubicInOut",
        animationDurationUpdate: 1500,
      },
      {
        type: "line",
        smooth: true,
        data: [
          { value: 320, name: "云南" },
          { value: 240, name: "四川" },
          { value: 149, name: "重庆" },
          { value: 100, name: "贵州" },
          { value: 59, name: "西藏" },
          { value: 39, name: "陕西" },
        ],
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
  });
});
</script>

<style scoped lang="scss">
.main {
  width: 96%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px;
  box-sizing: border-box;

  .top {
    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .charts {
      width: 100%;
      height: 350px;
      margin-top: 25px;
      padding-top: 25px;
    }
  }
}
</style>
