<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.category1Id"
          @change="handelC1Change"
          style="width: 200px"
          :disabled="!isTable"
        >
          <el-option
            v-for="c1 in categoryStore.category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.category2Id"
          @change="handelC2Change"
          style="width: 200px"
          :disabled="!isTable"
        >
          <el-option
            v-for="c2 in categoryStore.category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.category3Id"
          style="width: 200px"
          :disabled="!isTable"
        >
          <el-option
            v-for="c3 in categoryStore.category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted} from "vue";
import useCategoryStore from "@/store/modules/category";

// 接收父组件传过来的值
defineProps(["isTable"]);

let categoryStore = useCategoryStore();

let handelC1Change = () => {
  categoryStore.category2List = [];
  categoryStore.category3List = [];
  categoryStore.category3Id = "";
  categoryStore.category2Id = "";
  categoryStore.getCategoryList2(categoryStore.category1Id as number);
};

let handelC2Change = () => {
  categoryStore.category3List = [];
  categoryStore.category3Id = "";
  categoryStore.getCategoryList3(categoryStore.category2Id as number);
};

let getC1Arr = () => {
  categoryStore.getCategoryList1();
};

onMounted(() => {
  getC1Arr();
});
</script>

<style scoped></style>
