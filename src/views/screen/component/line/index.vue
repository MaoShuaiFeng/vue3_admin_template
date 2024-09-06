<template>
  <div class="box">
    <div class="main">
      <div class="top">
        <p class="title">未来7天游客趋势图</p>
        <p class="bg"></p>

        <!-- echarts图 -->
        <div ref="charts" class="charts"></div>
      </div>
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
      text: "访问量",
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff",
        },
        axisTick: {
          show: true,
        },
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
      axisTick: {
        show: true,
      },
    },
    series: [
      {
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#00DAFF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#3F45EC ", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: [122, 322, 121, 78, 322, 654, 578],
      },
    ],
    grid: {
      left: 40,
      right: 40,
      bottom: 10,
      top: 50,
      containLabel: true,
    },
  });
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  padding: 20px;
}
.main {
  width: 100%;
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
      height: 225px;
      margin-top: 15px;
    }
  }
}
</style>
