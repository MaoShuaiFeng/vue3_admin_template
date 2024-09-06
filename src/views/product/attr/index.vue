<template>
  <div>
    <Category :isTable="isTable" />
    <el-card style="margin: 10px 0">
      <div v-show="isTable">
        <el-button
          type="primary"
          plain
          icon="Plus"
          :disabled="categoryStore.category3Id ? false : true"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrArr" border style="margin: 20px 0" max-height="calc(100vh - 326px)">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px" align="center">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="编辑"
                plain
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`您确认要删除- ${row.attrName} -吗?`"
                icon="Delete"
                icon-color="#f56c6c"
                width="250"
                @confirm="deleteAttr(row.id)"
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
      </div>
      <div v-show="!isTable">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addAttrTableValue"
          >添加属性值</el-button
        >
        <el-button type="primary" plain @click="cancel">取消</el-button>
        <el-table
          border
          :data="attrParams.attrValueList"
          style="margin: 20px 0"
        >
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="valueName" align="center">
            <template #default="{ row, $index }">
              <el-input
                v-if="row.isEdit"
                :ref="(vc:any )=> inputArr[$index] = vc"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="toLook(row, $index)"
                autofocus
              ></el-input>
              <div v-else @dblclick="toEdit(row)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #default="{ row, $index }">
              <el-popconfirm
                :title="`您确认要删除- ${row.valueName} -吗?`"
                icon="Delete"
                icon-color="#f56c6c"
                width="250"
                @confirm="attrParams.attrValueList.splice($index, 1)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除"
                    plain
                  ></el-button>
                </template> </el-popconfirm
            ></template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="!attrParams.attrValueList.length"
          >保存</el-button
        >
        <el-button type="primary" plain @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, onBeforeUnmount } from "vue";
import useCategoryStore from "@/store/modules/category";
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from "@/api/product/attr";
import { AttrResponseData, Attr, AttrValue } from "@/api/product/attr/type";
import { ElMessage } from "element-plus";

let categoryStore = useCategoryStore();

let attrArr = ref<Attr[]>([]);
let isTable = ref(true);
let attrParams = ref<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
let inputArr = ref<any[]>([]);

watch(
  () => categoryStore.category3Id,
  () => {
    attrArr.value = [];
    if (!categoryStore.category3Id) return;
    getAttr();
  }
);

const getAttr = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore;
  let result: AttrResponseData = await reqAttr(
    category1Id as number,
    category2Id as number,
    category3Id as number
  );
  if (result.code === 200) {
    attrArr.value = result.data;
  }
};

const addAttr = () => {
  isTable.value = false;
  attrParams.value.categoryId = categoryStore.category3Id;
  attrParams.value = {
    attrName: "",
    attrValueList: [],
    categoryId: "",
    categoryLevel: 3,
  };
};
const updateAttr = (row: Attr) => {
  isTable.value = false;
  attrParams.value = JSON.parse(JSON.stringify(row));
};

const cancel = () => {
  isTable.value = true;
};

const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams.value);
  let tip = attrParams.value.id ? "更新" : "添加";
  if (result.code === 200) {
    ElMessage.success(`${tip}属性成功`);
    getAttr();
  } else {
    ElMessage.error(`${tip}属性失败`);
  }
  isTable.value = true;
};

// 添加属性值
const addAttrTableValue = () => {
  attrParams.value.attrValueList.push({
    valueName: "",
    isEdit: true,
  });
  nextTick(() => {
    //@ts-ignore
    inputArr.value[attrParams.value.attrValueList.length - 1].focus();
  });
};

const toLook = (row: AttrValue, index: number) => {
  if (row.valueName.trim() === "") {
    attrParams.value.attrValueList.splice(index, 1);
    return ElMessage.warning("属性值不能为空");
  }
  attrParams.value.attrValueList.find((item) => {
    if (item !== row) {
      if (item.valueName === row.valueName) {
        attrParams.value.attrValueList.splice(index, 1);
        return ElMessage.warning("属性值不能重复");
      }
    }
  });
  row.isEdit = false;
};
const toEdit = (row: AttrValue) => {
  row.isEdit = true;
};

const deleteAttr = async (id: number) => {
  let result = await reqDeleteAttr(id);
  if (result.code === 200) {
    ElMessage.success("删除属性成功");
    getAttr();
  } else {
    ElMessage.error("删除属性失败");
  }
};
//组件销毁清空仓库
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped></style>
