<template>
  <el-card>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="Plus" plain @click="addTrademark">
      添加品牌
    </el-button>
    <!-- 表格 -->
    <el-table style="margin: 20px auto" border :data="trademarkArr">
      <el-table-column label="序号" width="80" align="center">
        <template #default="{ $index }">
          <span>{{ (pageNo - 1) * limit + $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        align="center"
      ></el-table-column>
      <el-table-column label="Logo" align="center">
        <template #default="{ row }">
          <img
            :src="row.logoUrl"
            alt="加载失败"
            style="width: 120px; height: 90px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            title="编辑"
            plain
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确认要删除- ${row.tmName} -吗?`"
            icon="Delete"
            icon-color="#f56c6c"
            width="250"
            @confirm="deleteTrademark(row.id)"
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
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[5, 10, 20, 100]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes , total"
        :pager-count="7"
        :total="total"
        @size-change="pageSizeChangeFn"
        @current-change="getHasTrademark"
      />
    </div>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">
      <el-form
        ref="formRef"
        :model="trademarkFormParams"
        :rules="trademarkFormRules"
      >
        <el-form-item label="品牌名称" label-width="90px" prop="tmName">
          <el-input
            v-model="trademarkFormParams.tmName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="品牌Logo" label-width="90px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="pd-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="cancelFn">取消</el-button>
        <el-button @click="confirmFn" type="primary" :loading="dialogLoading"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqHasTrademark,
  addOrUpdateTrademark,
  deleteTradeMark,
} from "@/api/product/trademark";
import { onMounted, ref, nextTick } from "vue";
import type {
  Record,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";

interface RowDataType {
  createTime: string;
  id: number;
  logoUrl: string;
  tmName: string;
  updateTime: string;
}

let pageNo = ref<number>(1);
let limit = ref<number>(5);
let total = ref<number>(0);
let trademarkArr = ref<Record>([]);
let dialogFormVisible = ref<boolean>(false);
let trademarkFormParams = ref<TradeMark>({
  tmName: "",
  logoUrl: "",
});
let imageUrl = ref<string>("");
let dialogTitle = ref<string>("添加品牌");
let formRef = ref(); // 获取form组件实例
let dialogLoading = ref(false);

const resetParams = () => {
  trademarkFormParams.value = {
    tmName: "",
    logoUrl: "",
  };
  imageUrl.value = "";
  // 清除校验失败文字,还可以使用formRef.value?.clearValidate(["logoUrl", "tmName"]);
  nextTick(() => {
    formRef.value.clearValidate(["logoUrl", "tmName"]);
  });
};

//获取品牌list
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value
  );
  if (result.code === 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};

// 分页大小变化
const pageSizeChangeFn = () => {
  // 重置页码
  // 不传参数,页码默认为1
  getHasTrademark();
};

//添加品牌
const addTrademark = () => {
  resetParams();
  dialogFormVisible.value = true;
  dialogTitle.value = "添加品牌";
};

//更新品牌
const updateTrademark = (row: RowDataType) => {
  resetParams();
  dialogFormVisible.value = true;
  dialogTitle.value = "编辑品牌";
  trademarkFormParams.value.tmName = row.tmName;
  trademarkFormParams.value.logoUrl = row.logoUrl;
  trademarkFormParams.value.id = row.id;
  // ES6语法合并对象,如果trademarkFormParams用reactive定义的,trademarkFormParams = {...row}会失去响应式
  // Object.assign(trademarkFormParams.value, row);不会失去响应式
  imageUrl.value = row.logoUrl;
};

//删除品牌
const deleteTrademark = async (id: number) => {
  let result = await deleteTradeMark(id);
  if (result.code === 200) {
    ElMessage.success("删除品牌成功");
    // 如果删除的不是第一页的最后一个,页码-1
    if (pageNo.value !== 1 && trademarkArr.value.length === 1) {
      pageNo.value--;
    }
    getHasTrademark(pageNo.value);
  } else {
    ElMessage.error("删除品牌失败");
  }
};

// 取消
const cancelFn = () => {
  dialogFormVisible.value = false;
  resetParams();
};

// 确认
const confirmFn = async () => {
  let optionTitle = dialogTitle.value === "添加品牌" ? "添加" : "更新";
  dialogLoading.value = true;
  //确认前表单校验
  await formRef.value.validate(); // 校验表单,失败后就不会执行后续代码
  try {
    let result = await addOrUpdateTrademark(trademarkFormParams.value);
    if (result.code === 200) {
      ElMessage.success(`${optionTitle}品牌成功`);
      getHasTrademark(optionTitle === "更新" ? pageNo.value : 1);
    } else {
      ElMessage.error(`${optionTitle}品牌成功`);
    }
  } catch (error) {
    ElMessage.error(`${optionTitle}品牌成功`);
    console.error("Error:", error);
  } finally {
    dialogFormVisible.value = false;
    resetParams();
    dialogLoading.value = false;
  }
};

//上传图片前的钩子函数
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
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

//图片上传成功钩函数
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  trademarkFormParams.value.logoUrl = response.data;
  // 上传成功后清除表单校验错误信息
  formRef.value.clearValidate("logoUrl");
};

// 自定义校验tnName
const validatorTmName = (rule: any, value: any, callback: any) => {
  // rule:校验规则对象
  // value:校验的值
  // callback:回调函数,校验通过不传参,校验不通过传参
  if (value.trim().length >= 2 && value.trim().length <= 10) {
    callback();
  } else {
    callback(new Error("品牌名称长度在2到10个字符之间"));
  }
};
//自定义校验logoUrl
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("品牌图片不能为空"));
  }
};

//表单校验对象
const trademarkFormRules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
