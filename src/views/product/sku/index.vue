<template>
  <div>
    <el-card>
      <el-table :data="skuArr" border max-height="calc(100vh - 194px)">
        <el-table-column label="序号" type="index" width="80px" align="center">
          <template #default="{ $index }">
            <span>{{ (pageNo - 1) * pageSize + $index + 1 }}</span>
          </template></el-table-column
        >
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
              type="info"
              size="small"
              icon="InfoFilled"
              plain
              title="查看"
              @click="findSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确认要删除- ${row.skuName} -吗?`"
              icon="Delete"
              icon-color="#f56c6c"
              width="250"
              @confirm="deleteSku(row.id)"
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
    <!-- 抽屉组件展示商品详情 -->
    <el-drawer v-model="drawer" size="500px" style="background-color: #fdfdfd">
      <template #header>
        <h4>商品详情</h4>
      </template>
      <template #default>
        <el-form label-width="70px">
          <el-form-item label="名称">
            <el-input v-model="skuInfo.skuName" disabled></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="skuInfo.skuDesc"
              disabled
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input type="number" v-model="skuInfo.price" disabled></el-input>
          </el-form-item>
          <el-form-item label="平台属性">
            <el-tag
              v-for="tag in skuInfo.skuAttrValueList"
              :key="tag.id"
              style="margin: 2px"
            >
              {{ tag.attrName }} : {{ tag.valueName }}
            </el-tag>
          </el-form-item>
          <el-form-item label="销售属性">
            <el-tag
              v-for="tag in skuInfo.skuSaleAttrValueList"
              :key="tag.id"
              style="margin: 2px"
            >
              {{ tag.saleAttrName }} : {{ tag.saleAttrValueName }}
            </el-tag>
          </el-form-item>
          <el-form-item label="图片"> </el-form-item>
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <el-image :src="item.imgUrl"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-form>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqCancelSaleSku,
  reqDeleteSku,
  reqSaleSku,
  reqSkuInfo,
  reqSkuList,
} from "@/api/product/sku";
import { SkuResponseData } from "@/api/product/sku/type";
import { SkuData } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

let pageNo = ref(1);
let pageSize = ref(10);
let total = ref(0);
let skuArr = ref<SkuData[]>([]);
let drawer = ref(false);
let skuInfo = ref<SkuData>({});

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

const findSku = async (row: SkuData) => {
  skuInfo.value = {} as SkuData;
  drawer.value = true;
  let result = await reqSkuInfo(row.id!);
  skuInfo.value = result.data;
};

const deleteSku = async (id: number) => {
  let result = await reqDeleteSku(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    // 如果删除的不是第一页的最后一个,页码-1
    if (pageNo.value !== 1 && skuArr.value.length === 1) {
      pageNo.value--;
    }
    getSkuList(pageNo.value);
  } else {
    ElMessage.error("删除失败");
  }
};

onMounted(() => {
  getSkuList();
});
</script>

<style scoped>
:deep(.el-carousel .el-carousel__item h3) {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

:deep(.el-carousel .el-carousel__item:nth-child(2n)) {
  background-color: #99a9bf;
}

:deep(.el-carousel .el-carousel__item:nth-child(2n + 1)) {
  background-color: #d3dce6;
}
</style>
