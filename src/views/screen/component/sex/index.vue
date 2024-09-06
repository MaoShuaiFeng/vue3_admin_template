<template>
  <div class="main">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
      <div class="sex">
        <div class="man">
          <img src="../../images/man.png" alt="" />
        </div>
        <div class="woman">
          <img src="../../images/woman.png" alt="" />
        </div>
      </div>
      <div class="rate">
        <div>男生比例58%</div>
        <div>女生比例42%</div>
      </div>
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
    xAxis: {
      show: false,
      type: "value",
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        data: [58],
        type: "bar",
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "#3478F5",
          borderRadius: 20,
        },
      },
      {
        data: [100],
        type: "bar",
        barWidth: 20,
        barGap: "-100%",
        itemStyle: {
          color: "#EC5A7B",
          borderRadius: 20,
        },
      },
    ],
    grid:{
        left: "11%",
    }
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

    .sex {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: 30px;

      .man {
        background: url(../../images/man-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 140px;
        height: 120px;
        text-align: center;
        line-height: 150px;
      }

      .woman {
        background: url(../../images/woman-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 140px;
        height: 120px;
        text-align: center;
        line-height: 150px;
      }
    }
    .rate {
      display: flex;
      justify-content: space-evenly;
      color: white;
      margin-top: 20px;
    }

    .charts {
      width: 100%;
      height: 50px;
    }
  }
}
</style>
