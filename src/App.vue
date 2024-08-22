<template>
  <div>
    <h1>App</h1>
    <el-button :icon="Plus">123</el-button>
    <el-button type="primary" :icon="Edit">123</el-button>
    <el-button type="success" size="large" :icon="Edit">123</el-button>
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
  </div>
  <A></A>
</template>

<script setup lang="ts">
import { Edit, Plus } from "@element-plus/icons-vue";
</script>

<style scoped></style>
