<template>
  <div>
    <el-form ref="formRef" :model="skuParams" label-width="100px">
      <el-form-item prop="skuName" label="SKU名称">
        <el-input
          v-model="skuParams.skuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="price" label="价格（元）">
        <el-input
          v-model="skuParams.price"
          placeholder="请输入价格"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item prop="weight" label="重量（g）">
        <el-input
          v-model="skuParams.weight"
          placeholder="请输入重量"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item prop="skuDesc" label="SKU描述">
        <el-input
          v-model="skuParams.skuDesc"
          placeholder="请输入SKU描述"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item prop="skuAttrValueList" label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select
              v-model="item.attrIdAndValueId"
              style="width: 150px; margin-bottom: 5px"
            >
              <el-option
                v-for="attrValue in item.attrValueList"
                style="width: 150px"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :title="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item prop="skuSaleAttrValueList" label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              v-model="item.saleIdAndValueId"
              style="width: 150px; margin-bottom: 5px"
            >
              <el-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                style="width: 150px"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :title="saleAttrValue.saleAttrValueName"
                :value="`${item.id}:${saleAttrValue.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item prop="skuDefaultImg" label="图片名称">
        <el-table
          ref="tableRef"
          border
          :data="imageArr"
          header-row-class-name="center"
          row-class-name="center"
        >
          <el-table-column
            type="selection"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template #default="{ row }">
              <el-image :src="row.imgUrl" alt="图片" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" plain @click="handlerImg(row)"
                >设置默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  ImageListResponseData,
  SaleAttr,
  SaleAttrResponseData,
  SkuData,
  SpuData,
  SpuImage,
} from "@/api/product/spu/type";
import type { Attr } from "@/api/product/attr/type";
import { reqAttr } from "@/api/product/attr";
import { reqSpuAttr, reqImageList, reqAddSku } from "@/api/product/spu";
import { AttrResponseData } from "@/api/product/attr/type";
import { ref } from "vue";
import { ElMessage } from "element-plus";

let $emit = defineEmits(["changeScene"]);
let attrArr = ref<Attr[]>([]);
let saleArr = ref<SaleAttr[]>([]);
let imageArr = ref<SpuImage[]>([]);
let skuParams = ref<SkuData>({
  category3Id: "", //三级分类id
  spuId: "", //已有品牌的id
  tmId: "", //spu品牌id
  skuName: "", //sku名字
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [], //平台属性收集
  skuSaleAttrValueList: [], //销售属性收集
  skuDefaultImg: "",
});
let tableRef = ref();
let formRef = ref();
const cancel = () => {
  $emit("changeScene", 0, true, false);
  formRef.value.resetFields();
};
const save = async () => {
  //收集平台属性
  skuParams.value.skuAttrValueList = attrArr.value.reduce(
    (prev: any, curr: any) => {
      if (curr.attrIdAndValueId) {
        let [attrId, valueId] = curr.attrIdAndValueId.split(":");
        prev.push({ attrId, valueId });
      }
      return prev;
    },
    []
  );
  //销售属性
  skuParams.value.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, curr: any) => {
      if (curr.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = curr.saleIdAndValueId.split(":");
        prev.push({ saleAttrId, saleAttrValueId });
      }
      return prev;
    },
    []
  );
  console.log(skuParams.value);
  let result: any = await reqAddSku(skuParams.value);
  if (result.code === 200) {
    ElMessage.success("添加成功");
    $emit("changeScene", 0, false);
    formRef.value.resetFields();
  } else {
    ElMessage.error("添加失败");
  }
};
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  row: SpuData
) => {
  skuParams.value.category3Id = row.category3Id;
  skuParams.value.spuId = row.id!;
  skuParams.value.tmId = row.tmId;
  // 获取平台属性
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, row.category3Id);
  //获取销售属性
  let result1: SaleAttrResponseData = await reqSpuAttr(row.id!);
  // 获取照片墙的数据
  let result2: ImageListResponseData = await reqImageList(row.id!);
  attrArr.value = result.data;
  saleArr.value = result1.data;
  imageArr.value = result2.data;
};

//处理图片
const handlerImg = (row: SpuImage) => {
  tableRef.value.clearSelection();
  tableRef.value.toggleRowSelection(row);
  skuParams.value.skuDefaultImg = row.imgUrl!;
};

defineExpose({ initSkuData });
</script>

<style scoped lang="scss">
:deep(.center) {
  .cell {
    text-align: center;
  }
}
</style>
