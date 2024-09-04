<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item label="角色搜索">
          <el-input
            v-model="searchRole"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="Search"
            :disabled="!searchRole.trim().length"
            @click="getHasRole(1)"
            >搜索</el-button
          >
          <el-button type="primary" icon="RefreshRight" plain @click="reset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole"
        >添加角色</el-button
      >
      <!-- 角色信息 -->
      <el-table :data="roleArr" style="margin-top: 20px" border>
        <el-table-column label="序号" align="center">
          <template #default="{ $index }">
            {{ (pageNo - 1) * pageSize + $index + 1 }}
          </template></el-table-column
        >
        <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="职位名称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="300px"
          align="center"
          fixed="right"
        >
          <template #default="{ row, $index }">
            <el-button
              type="success"
              icon="User"
              size="small"
              plain
              @click="setRole(row)"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              plain
              @click="updateRole(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`您确认要删除- ${row.roleName} -吗?`"
              icon="Delete"
              icon-color="#f56c6c"
              width="250"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除"
                  plain
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 20]"
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
    <!-- 抽屉--添加更新角色 -->
    <el-drawer v-model="drawer" size="500px" style="background-color: #fdfdfd">
      <template #header>
        <h4>{{ drawerTitle }}</h4>
      </template>
      <template #default>
        <el-form
          ref="formRef"
          :model="roleParams"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="roleParams.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="text-align: left">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancelClick" plain>取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 抽屉--分配角色 -->
    <el-drawer v-model="drawer2" size="500px" style="background-color: #fdfdfd">
      <template #header>
        <h4>分配角色和权限</h4>
      </template>
      <template #default>
        <el-form label-width="80px">
          <el-form-item label="角色姓名">
            <el-input v-model="roleParams.roleName" disabled></el-input>
          </el-form-item>
          <!-- 角色列表 -->
          <el-form-item label="角色列表">
            <el-tree
              ref="treeRef"
              style="min-width: 300px"
              :data="menuArr"
              show-checkbox
              node-key="id"
              :default-checked-keys="checkedPermission"
              :props="defaultProps"
              default-expand-all
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="text-align: left">
          <el-button type="primary" @click="saveRole">保存</el-button>
          <el-button type="primary" @click="cancelForRole" plain
            >取消</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Records, User, UserResponseData } from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
import { onMounted, ref, nextTick } from "vue";
import useLayOutSettingStore from "@/store/modules/setting";
import {
  reqAddAndUpdateRole,
  reqAllPermission,
  reqAllRole,
  reqAssignPermission,
  reqDeleteRole,
} from "@/api/acl/role";
import {
  MenuDataList,
  PermissionResponseData,
  RoleData,
} from "@/api/acl/role/type";

let layoutSettingStore = useLayOutSettingStore();

let pageNo = ref(1);
let pageSize = ref(3);
let total = ref(0);
let roleArr = ref<Records>([]);
let drawer = ref(false); //添加角色
let drawer2 = ref(false); //分配角色
let drawerTitle = ref("");
let roleParams = ref<RoleData>({
  roleName: "",
});
let formRef = ref();
let searchRole = ref("");

const defaultProps = {
  children: "children",
  label: "name",
};
let treeRef = ref();

const menuArr = ref<MenuDataList>([]);
const checkedPermission = ref<number[]>([]);

const validatorFn = (rule: any, value: any, callBack: any) => {
  if (value?.trim().length > 5) {
    callBack();
  } else {
    callBack(new Error("角色名长度至少六位！"));
  }
};

let rules = {
  roleName: [{ required: true, trigger: "blur", validator: validatorFn }],
};

const getHasRole = async (pager = 1) => {
  pageNo.value = pager;
  let result: UserResponseData = await reqAllRole(
    pageNo.value,
    pageSize.value,
    searchRole.value
  );
  if (result.code === 200) {
    pageNo.value = result.data.current;
    total.value = result.data.total;
    pageSize.value = result.data.size;
    roleArr.value = result.data.records;
  }
};

const handleCurrentChange = (pager: number) => {
  getHasRole(pager);
};

const handleSizeChange = () => {
  getHasRole();
};

const addRole = () => {
  //   formRef.value?.clearValidate()
  roleParams.value = {} as RoleData;
  drawerTitle.value = "添加角色";
  nextTick(() => {
    formRef.value.clearValidate();
  });
  if (
    roleParams.value.id !== undefined &&
    roleParams.value.id !== null &&
    roleParams.value.id !== 0
  ) {
    delete roleParams.value.id;
  }
  drawer.value = true;
};

const updateRole = (row: User) => {
  drawerTitle.value = "更新角色";
  roleParams.value = {} as RoleData;
  nextTick(() => {
    formRef.value.clearValidate();
  });
  roleParams.value = JSON.parse(JSON.stringify(row));
  drawer.value = true;
};

const save = async () => {
  await formRef.value.validate();
  let tip = drawerTitle.value === "添加角色" ? "添加" : "更新";
  // 更新前的角色名
  let result = await reqAddAndUpdateRole(roleParams.value);
  if (result.code === 200) {
    drawer.value = false;
    ElMessage.success(`${tip}成功`);
    getHasRole(drawerTitle.value === "添加角色" ? 1 : pageNo.value);
  } else {
    ElMessage.error(`${tip}失败`);
  }
};
const cancelClick = () => {
  drawer.value = false;
};

// 获取四级菜单中 select 为 true 的 ID 数组
const getCheckedPermission = (data: MenuDataList): number[] => {
  if (!Array.isArray(data)) {
    throw new Error("Invalid input: data must be an array.");
  }

  const arr: number[] = [];

  data.forEach((item) => {
    // 简化条件判断语句
    if (item.select && item.level === 4) {
      arr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      // 避免递归空数组
      arr.push(...getCheckedPermission(item.children));
    }
  });

  return arr;
};

const setRole = async (row: RoleData) => {
  drawer2.value = true;
  roleParams.value = row;
  let result: PermissionResponseData = await reqAllPermission(row.id!);
  if (result.code === 200) {
    menuArr.value = result.data;
    checkedPermission.value = getCheckedPermission(menuArr.value);
  }
};

const saveRole = async () => {
  let checkArr = treeRef.value.getCheckedKeys();
  let checkHalfArr = treeRef.value.getHalfCheckedKeys();
  let permissionArr = [...checkArr, ...checkHalfArr];
  let result = await reqAssignPermission(roleParams.value.id!, permissionArr);
  if (result.code === 200) {
    ElMessage.success("分配成功");
    drawer2.value = false;
    window.location.reload();
  } else {
    ElMessage.error("分配失败");
  }
};

const cancelForRole = () => {
  drawer2.value = false;
};

const deleteRole = async (id: number) => {
  let result = await reqDeleteRole(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    if (pageNo.value !== 1 && roleArr.value.length === 1) pageNo.value--;
    getHasRole(pageNo.value);
  } else {
    ElMessage.error("删除失败");
  }
};

const reset = () => {
  layoutSettingStore.isRefresh = !layoutSettingStore.isRefresh;
};

onMounted(() => {
  getHasRole();
});
</script>

<style scoped>
.el-form-item {
  margin-bottom: 25px;
}
</style>
