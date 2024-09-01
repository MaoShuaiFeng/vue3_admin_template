<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuParams.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuParams.tmId" style="width: 240px">
          <el-option
            v-for="item in allTradeMarkArr"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuParams.description"
          type="textarea"
          placeholder="请输入SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imageList"
          action="pd-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="handleBeforeUpload"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="saleAttrIdAndValueName"
          :placeholder="
            unSelectSaleAttr.length
              ? `还未选择${unSelectSaleAttr.length}个属性`
              : '暂无属性可选'
          "
          style="width: 240px"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          ></el-option>
        </el-select>
        <el-button
          @click="addSaleAttr"
          :disabled="!saleAttrIdAndValueName"
          type="primary"
          icon="Plus"
          plain
          style="margin-left: 10px"
          >添加属性</el-button
        >
        <el-table :data="saleAttr" border style="margin: 20px 0">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="销售属性名称"
            width="120px"
            align="center"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="销售属性值" align="center">
            <template #default="{ row, $index }">
              <el-tag
                style="margin: 2px 5px"
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                @close="row.spuSaleAttrValueList.splice($index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.editFlag"
                v-model="row.saleAttrValue"
                placeholder="请你输入属性值"
                size="small"
                style="width: 100px; margin-right: 5px"
                @blur="toLook(row)"
              ></el-input>
              <el-button
                v-else
                type="success"
                icon="Plus"
                size="small"
                plain
                title="添加"
                @click="toEdit(row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px" align="center">
            <template #default="{ row, $index }">
              <el-button
                type="danger"
                icon="Delete"
                plain
                size="small"
                title="删除"
                @click="saleAttr.splice($index, 1)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!saleAttr.length" type="primary" @click="save"
          >保存</el-button
        >
        <el-button type="primary" plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuData,
  SpuImage,
  TradeMarkListResponseData,
  TradeMark,
  ImageListResponseData,
  SaleAttr,
  HsaSaleAttr,
  SaleAttrValue,
} from "@/api/product/spu/type";
import {
  reqAllSaleAttr,
  reqImageList,
  reqAllTradeMark,
  reqSpuAttr,
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
import { ElMessage, UploadProps } from "element-plus";

let $emit = defineEmits(["changeScene"]);
let allTradeMarkArr = ref<TradeMark[]>([]);
let imageList = ref<SpuImage[]>([]);
let saleAttr = ref<SaleAttr[]>([]);
let allSaleAttr = ref<HsaSaleAttr[]>([]);
const initData = {
  category3Id: "",
  spuName: "",
  description: "",
  tmId: "",
  spuImageList: [],
  spuSaleAttrList: [],
};
let spuParams = ref<SpuData>(initData);
let dialogVisible = ref<boolean>(false);
let dialogImageUrl = ref<string>("");
// 收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref("");

const unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return !saleAttr.value.some((item2) => item.id === item2.baseSaleAttrId);
  });
  return unSelectArr;
});

const clearData = () => {
  Object.assign(spuParams.value, initData);
  if (spuParams.value.id) delete spuParams.value.id;
  // 清空照片墙
  imageList.value = [];
  // 清空销售属性
  saleAttr.value = [];
};

const initHasSpuData = async (spu: SpuData) => {
  // 存储父组件传过来的数据
  spuParams.value = spu;
  //获取全部品牌数据
  let result: TradeMarkListResponseData = await reqAllTradeMark();
  //获取图片
  let result1: ImageListResponseData = await reqImageList(spu.id as number);
  //获取spu销售属性
  let result2: SaleAttrResponseData = await reqSpuAttr(spu.id as number);
  //获取所有的spu销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  allTradeMarkArr.value = result.data;
  imageList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  saleAttr.value = result2.data;
  allSaleAttr.value = result3.data;
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handleBeforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  // 判断文件类型是否合法
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error("上传文件的格式务必为JPG/PNG/GIF/WEBP");
    return false;
  }
  if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("上传的图片的大小不能超过4MB");
    return false;
  }
  return true;
};

const addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(":");
  let newArr: SaleAttr = {
    baseSaleAttrId: Number(baseSaleAttrId),
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  saleAttr.value.push(newArr);
  saleAttrIdAndValueName.value = "";
};

const toEdit = (row: SaleAttr) => {
  row.editFlag = true;
  row.saleAttrValue = "";
};
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue, spuId, saleAttrName } = row;
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    spuId,
    saleAttrName,
    saleAttrValueName: saleAttrValue,
  };
  if (saleAttrValue?.trim() === "") {
    ElMessage.warning("属性值不能为空");
    row.editFlag = false;
    return;
  }
  row.spuSaleAttrValueList.find((item) => {
    if (item.saleAttrValueName === saleAttrValue) {
      ElMessage.warning("属性值不能重复");
      row.editFlag = false;
      throw new Error("属性值不能重复");
    }
  });
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  row.editFlag = false;
};

const save = async () => {
  //收集照片墙数据
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  // 收集销售属性数据
  spuParams.value.spuSaleAttrList = saleAttr.value;
  let result = await reqAddOrUpdateSpu(spuParams.value);
  let tip = spuParams.value.id ? "更新" : "添加";
  if (result.code === 200) {
    ElMessage.success(`${tip}成功`);
    $emit("changeScene", 0, Boolean(spuParams.value.id));
  } else {
    ElMessage.error(`${tip}失败`);
  }
  clearData();
};
const cancel = () => {
  $emit("changeScene", 0, false);
  clearData();
};
//添加SPU初始化
const initAddSpuData = async (category3Id: number) => {
  // 清空数据
  clearData();
  // 存储父组件传过来的数据
  spuParams.value.category3Id = category3Id;
  //获取全部品牌数据
  let result: TradeMarkListResponseData = await reqAllTradeMark();
  allTradeMarkArr.value = result.data;
  //获取所有的spu销售属性
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr();
  allSaleAttr.value = result1.data;
};

defineExpose({
  initHasSpuData,
  initAddSpuData,
});
</script>

<style scoped></style>
