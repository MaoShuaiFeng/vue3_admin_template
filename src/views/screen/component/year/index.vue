<template>
  <div class="main">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
      <!-- echarts图 -->
      <div ref="charts" class="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let charts = ref(null);

onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {
      text: "散点图",
      top: 20,
      textStyle: {
        color: "#fff",
        fontSize: 20,
      },
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff",
        },
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["2018", "2019", "2020"],
      right: 0,
      top: -3,
      bottom: 0,
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: 30,
      right: 20,
      top: 80,
      bottom: 40,
    },
    series: [
      {
        type: "scatter",
        name: "2018",
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [2.02, 4.47],
          [1.05, 3.33],
          [14.0, 7.66],
          [14.0, 9.96],
          [11.0, 8.33],
        ],
      },
      {
        type: "scatter",
        name: "2019",
        data: [
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [6.03, 7.24],
          [14.0, 9.96],
        ],
      },
      {
        type: "scatter",
        name: "2020",
        data: [
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
        ],
      },
    ],
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
      height: 240px;
    }
  }
}
</style>
