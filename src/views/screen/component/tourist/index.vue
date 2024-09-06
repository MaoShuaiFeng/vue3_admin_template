<template>
  <div class="main">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <div class="right1">可预约总量<span>999999</span>人</div>
      <div class="people">
        <span v-for="item in peopleNum" :key="item" class="item">{{
          item
        }}</span>
      </div>
      <!-- echarts图 -->
      <div ref="charts" class="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill"; //水球图拓展插件

let peopleNum = ref("215908人");
let charts = ref(null);

onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption({
    series: [
      {
        type: "liquidFill",
        waveAnimation: true,
        animationDuration: 1000,
        animationDurationUpdate: 1000,
        data: [0.6, 0.5, 0.4, 0.3],
        radius: "80%",
        center: ["50%", "50%"],
        // 渐变色填充
        // 定义颜色
        color: [
          {
            // 线性渐变
            type: "linear",
            // x轴开始位置
            x: 0,
            // y轴开始位置
            y: 0,
            // x轴结束位置
            x2: 0,
            // y轴结束位置
            y2: 1,
            // 颜色渐变
            colorStops: [
              { offset: 0, color: "#32EDEF" },
              { offset: 1, color: "#1E90FF" },
            ],
            // 是否使用全局坐标
            globalCoord: false,
          },
        ],

        // 边框样式
        outline: {
          show: true,
          borderDistance: 10,
          itemStyle: {
            borderColor: "#32EDEF",
            borderWidth: 10,
            borderRadius: 10,
          },
        },
        // 背景样式
        backgroundStyle: {
          color: "transparent",
        },
      },
    ],
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
    .right1 {
      float: right;
      color: white;
      margin-right: 10px;

      span {
        color: #ef8832;
      }
    }

    .people {
      margin-top: 50px;
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      align-items: center;

      .item {
        background: url(../../images/total.png) no-repeat;
        width: 60px;
        height: 60px;
        background-size: 100% 100%;
        color: #2adbf0;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 20px rgb(51, 120, 209);
      }
    }

    .charts {
      width: 100%;
      height: 265px;
    }
  }
}
</style>
