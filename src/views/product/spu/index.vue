<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0">
      <!-- 建议使用v-show -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          plain
          icon="Plus"
          :disabled="!categoryStore.category3Id"
          @click="addSPU"
          >添加SPU</el-button
        >
        <el-table :data="recordsArr" border style="margin: 20px 0">
          <el-table-column label="序号" width="80" align="center">
            <template #default="{ $index }">
              <span>{{ (pageNo - 1) * pageSize + $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="SPU名称"
            prop="spuName"
            align="center"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="220px" align="center">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSKU(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SKU"
                plain
                @click="updateSPU(row)"
              ></el-button>
              <el-button
                type="default"
                size="small"
                icon="View"
                title="查看SKU"
                plain
                @click="getSkuList(row)"
              ></el-button>
              <el-popconfirm
                :title="`您确认要删除- ${row.spuName} -吗?`"
                icon="Delete"
                icon-color="#f56c6c"
                width="250"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除"
                    plain
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :pager-count="7"
          :background="true"
          layout=" prev, pager, next, jumper, ->, sizes,total,"
          :total="total"
          :disabled="undefined"
          @current-change="getSpuList"
          @size-change="changeSize"
        />
      </div>
      <!-- 添加修改spu 组件 -->
      <SpuForm
        v-show="scene === 1"
        ref="spuFormRef"
        @changeScene="changeScene"
      ></SpuForm>
      <!-- 添加sku 组件 -->
      <SkuForm
        v-show="scene === 2"
        ref="skuFormRef"
        @changeScene="changeScene"
      ></SkuForm>
    </el-card>
    <!-- 展示已有的sku数据 -->
    <el-dialog v-model="showDialog" title="SKU列表">
      <el-table :data="skuArr" border>
        <el-table-column label="名称" prop="skuName"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="重量" prop="weight"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" alt="" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import useCategoryStore from "@/store/modules/category";
import { reqDeleteSpu, reqHasSpu, reqSkuList } from "@/api/product/spu";
import type { SkuData, SkuInfoData, SpuData } from "@/api/product/spu/type";
import SpuForm from "./spuForm.vue";
import SkuForm from "./skuForm.vue";
import { ElMessage } from "element-plus";

let categoryStore = useCategoryStore();

let scene = ref<number>(0); //0:显示已有的SPU，1:添加或修改SPU，2:添加SKU
let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let recordsArr = ref<SpuData[]>([]);
let spuFormRef = ref();
let skuFormRef = ref();
let skuArr = ref<SkuData[]>([]);
let showDialog = ref(false);

watch(
  () => categoryStore.category3Id,
  () => {
    if (!categoryStore.category3Id) {
      recordsArr.value = [];
      pageNo.value = 1;
      pageSize.value = 5;
      return;
    }
    getSpuList();
  }
);

const getSpuList = async (pager = 1) => {
  pageNo.value = pager;
  let result = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.category3Id
  );
  if (result.code === 200) {
    recordsArr.value = result.data.records;
    total.value = result.data.total;
  }
};

const changeSize = () => {
  getSpuList();
};

const addSPU = () => {
  scene.value = 1;
  spuFormRef.value.initAddSpuData(categoryStore.category3Id);
};

// sceneNum:0:显示已有的SPU，1：添加或修改SPU，flag:false:添加SPU，true:修改SPU;
const changeScene = (sceneNum: number, flag: boolean, api: boolean = true) => {
  scene.value = sceneNum;
  if (api) {
    if (flag) {
      getSpuList(pageNo.value);
    } else {
      getSpuList();
    }
  }
};

const updateSPU = (row: SpuData) => {
  scene.value = 1;
  spuFormRef.value.initHasSpuData(row);
};

const deleteSpu = async (row: SpuData) => {
  let result = await reqDeleteSpu(row.id!);
  if (result.code === 200) {
    ElMessage.success("删除品牌成功");
    // 如果删除的不是第一页的最后一个,页码-1
    if (pageNo.value !== 1 && recordsArr.value.length === 1) {
      pageNo.value--;
    }
    getSpuList(pageNo.value);
  } else {
    ElMessage.error("删除品牌失败");
  }
};

const addSKU = async (row: SpuData) => {
  scene.value = 2;
  skuFormRef.value.initSkuData(
    categoryStore.category1Id,
    categoryStore.category2Id,
    row
  );
};

const getSkuList = async (row: SpuData) => {
  // 获取sku列表
  let result: SkuInfoData = await reqSkuList(row.id!);
  if (result.code === 200) {
    skuArr.value = result.data;
    showDialog.value = true;
  }
};

//组件销毁清空仓库
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped></style>
