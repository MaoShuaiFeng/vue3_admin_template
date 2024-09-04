<template>
  <div>
    <el-card>
      <el-table :data="permissionArr" border row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column
          label="操作"
          width="300px"
          align="center"
          fixed="right"
        >
          <template #default="{ row, $index }">
            <el-button
              :type="row.level === 3 ? 'success' : 'primary'"
              icon="User"
              size="small"
              plain
              v-show="row.level !== 4"
              @click="setMenu(row)"
              >{{ row.level === 3 ? "添加功能" : "添加菜单" }}</el-button
            >
            <el-button
              :type="row.level === 4 ? 'success' : 'primary'"
              icon="Edit"
              size="small"
              plain
              v-show="row.level !== 1"
              @click="updateMenu(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`您确认要删除- ${row.name} -吗?`"
              icon="Delete"
              icon-color="#f56c6c"
              width="250"
              @confirm="deleteMenu(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除"
                  plain
                  v-show="row.level !== 1"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加和编辑菜单dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500">
      <el-form label-width="80px">
        <el-form-item
          :label="dialogTitle.includes('菜单') ? '菜单名称' : '功能名称'"
        >
          <el-input placeholder="请输入名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input
            placeholder="请输入权限值"
            v-model="menuData.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="save"> 确认 </el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateMenu,
  reqAllPermission,
  reqDeleteMenu,
} from "@/api/acl/menu";
import {
  MenuParams,
  Permission,
  PermissionList,
  PermissionResponseData,
} from "@/api/acl/menu/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

let permissionArr = ref<PermissionList>([]);
let dialogVisible = ref(false);
let dialogTitle = ref("添加菜单");
let menuData = ref<MenuParams>({
  code: "",
  name: "",
});

const getAllPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission(1);
  permissionArr.value = result.data;
};

const deleteMenu = async (id: number) => {
  let result = await reqDeleteMenu(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getAllPermission();
  } else {
    ElMessage.error("删除失败");
  }
};
const setMenu = (row: Permission) => {
  menuData.value = { code: "", name: "" };
  dialogVisible.value = true;
  dialogTitle.value = row.level === 3 ? "添加功能" : "添加菜单";
  menuData.value.level = row.level + 1;
  menuData.value.pid = row.id;
};
const updateMenu = (row: Permission) => {
  menuData.value = { code: "", name: "" };
  dialogVisible.value = true;
  dialogTitle.value = row.level === 4 ? "更新功能" : "更新菜单";
  menuData.value = JSON.parse(JSON.stringify(row));
};

const save = async () => {
  dialogVisible.value = false;
  let result = await reqAddOrUpdateMenu(menuData.value);
  let tip = dialogTitle.value === "添加菜单" ? "添加" : "更新";
  if (result.code === 200) {
    ElMessage.success(`${tip}成功`);
    getAllPermission();
  } else {
    ElMessage.error(`${tip}失败`);
  }
};

onMounted(() => {
  getAllPermission();
});
</script>

<style scoped></style>
