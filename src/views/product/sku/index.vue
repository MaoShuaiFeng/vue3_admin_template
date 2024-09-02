<template>
  <div>
    <el-card>
      <el-table :data="skuArr" border>
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="名称"
          show-overflow-tooltip
          width="150px"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          show-overflow-tooltip
          width="150px"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="图片" width="150px">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt="图片"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量(g)"
          width="150px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          width="150px"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="250px" fixed="right">
          <template #default="{ row }">
            <el-button
              :type="row.isSale === 1 ? 'warning' : 'success'"
              size="small"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              :title="row.isSale === 1 ? '下架' : '上架'"
              plain
              @click="updateSale(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              plain
              title="编辑---正在开发中"
            ></el-button>
            <el-button
              type="default"
              size="small"
              icon="InfoFilled"
              plain
              title="查看"
            ></el-button>
            <el-popconfirm
              :title="`您确认要删除- ${row.skuName} -吗?`"
              icon="Delete"
              icon-color="#f56c6c"
              width="250"
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
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        :total="total"
        layout="prev, pager, next, jumper, ->, sizes , total"
        :pager-count="7"
        :disabled="undefined"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 20px"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqCancelSaleSku, reqSaleSku, reqSkuList } from "@/api/product/sku";
import { SkuResponseData } from "@/api/product/sku/type";
import { SkuData } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

let pageNo = ref(1);
let pageSize = ref(10);
let total = ref(0);
let skuArr = ref<SkuData[]>([]);

const getSkuList = async (pager = 1) => {
  pageNo.value = pager;
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  pageNo.value = result.data.current;
  total.value = result.data.total;
  pageSize.value = result.data.size;
  skuArr.value = result.data.records;
};

const handleCurrentChange = (pager: number) => {
  getSkuList(pager);
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  getSkuList();
};
const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    await reqCancelSaleSku(row.id!);
    ElMessage.success("下架成功");
  } else {
    await reqSaleSku(row.id!);
    ElMessage.success("上架成功");
  }
  getSkuList(pageNo.value);
};

onMounted(() => {
  getSkuList();
});
</script>

<style scoped></style>
