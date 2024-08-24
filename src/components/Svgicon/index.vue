<template>
  <div>
    <!-- 使用use元素引入svg图标，并设置fill属性为黄色 -->
    <svg>
      <use
        :xlink:href="prefix + name"
        :fill="color"
        :width="width"
        :height="height"
      ></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style scoped></style>
