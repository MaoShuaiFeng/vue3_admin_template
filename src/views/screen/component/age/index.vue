<template>
  <div class="main">
    <div class="top">
      <p class="title">年龄比例</p>
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
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      right: "20px",
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    series: [
      {
        name: "Age From",
        type: "pie",
        radius: ["50%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          color:"white"
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "小朋友" },
          { value: 735, name: "青少年" },
          { value: 580, name: "青年" },
          { value: 484, name: "中年" },
          { value: 300, name: "老年" },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style scoped lang="scss">
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
