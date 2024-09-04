<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item label="用户名">
          <el-input
            v-model="searchName"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="Search"
            :disabled="!searchName.trim().length"
            @click="getHasUser(1)"
            >搜索</el-button
          >
          <el-button type="primary" icon="RefreshRight" plain @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addUser"
        >添加用户</el-button
      >
      <el-popconfirm
        :title="`您确认要删除所选择的${selectIdArr.length}位用户吗?`"
        icon="Delete"
        icon-color="#f56c6c"
        width="250"
        @confirm="deleteSelectUser"
      >
        <template #reference>
          <el-button
            type="danger"
            icon="Delete"
            title="批量删除"
            :disabled="selectIdArr.length === 0"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
      <!-- 用户信息 -->
      <el-table
        :data="userArr"
        @selection-change="handleSelectionChange"
        style="margin-top: 20px"
        border
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
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
          prop="name"
          label="用户昵称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="账号名称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
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
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              plain
              @click="updateUser(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`您确认要删除- ${row.username} -吗?`"
              icon="Delete"
              icon-color="#f56c6c"
              width="250"
              @confirm="deleteUser(row.id)"
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
    <!-- 抽屉--添加更新账号 -->
    <el-drawer v-model="drawer" size="500px" style="background-color: #fdfdfd">
      <template #header>
        <h4>{{ drawerTitle }}</h4>
      </template>
      <template #default>
        <el-form
          ref="formRef"
          :model="userParams"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="用户昵称" prop="name">
            <el-input
              v-model="userParams.name"
              placeholder="请输入用户昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号名称" prop="username">
            <el-input
              v-model="userParams.username"
              placeholder="请输入账号名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-show="drawerTitle === '添加用户'"
            label="账号密码"
            prop="password"
          >
            <el-input
              v-model="userParams.password"
              placeholder="请输入账号密码"
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
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form label-width="80px">
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" disabled></el-input>
          </el-form-item>
          <!-- 角色列表 -->
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRole"
              @change="handlecheckedRoleChange"
            >
              <el-checkbox
                v-for="role in rolesArr"
                :key="role"
                :label="role"
                :value="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
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
import {
  reqAddAndUpdateUser,
  reqAllRoles,
  reqAssignRole,
  reqBatchDeleteUser,
  reqDeleteUser,
  reqUserInfo,
} from "@/api/acl/user";
import { Records, User, UserResponseData } from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
import { onMounted, ref, nextTick } from "vue";
import useUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting";

let layoutSettingStore = useLayOutSettingStore();

let userStore = useUserStore();

let pageNo = ref(1);
let pageSize = ref(3);
let total = ref(0);
let userArr = ref<Records>([]);
let drawer = ref(false); //添加用户
let drawer2 = ref(false); //分配角色
let drawerTitle = ref("");
let userParams = ref<User>({
  name: "",
  username: "",
  password: "",
});
let formRef = ref();
// 更新前的用户名称
let oldName = ref("");
const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedRole: any = ref([]);
const rolesArr: any = ref([]);
let selectIdArr = ref<number[]>([]);
let searchName = ref("");

const validatorFn = (rule: any, value: any, callBack: any) => {
  if (value?.trim().length > 5) {
    callBack();
  } else {
    callBack(new Error("用户名长度至少六位！"));
  }
};

let rules = {
  name: [{ required: true, trigger: "blur", validator: validatorFn }],
  username: [{ required: true, trigger: "blur", validator: validatorFn }],
  password: [{ required: true, trigger: "blur", validator: validatorFn }],
};

const getHasUser = async (pager = 1) => {
  pageNo.value = pager;
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    searchName.value
  );
  if (result.code === 200) {
    pageNo.value = result.data.current;
    total.value = result.data.total;
    pageSize.value = result.data.size;
    userArr.value = result.data.records;
  }
};

const handleCurrentChange = (pager: number) => {
  getHasUser(pager);
};

const handleSizeChange = () => {
  getHasUser();
};

const addUser = () => {
  //   formRef.value?.clearValidate()
  userParams.value = {};
  drawerTitle.value = "添加用户";
  nextTick(() => {
    formRef.value.clearValidate();
  });
  if (
    userParams.value.id !== undefined &&
    userParams.value.id !== null &&
    userParams.value.id !== 0
  ) {
    delete userParams.value.id;
  }
  drawer.value = true;
};

const updateUser = (row: User) => {
  drawerTitle.value = "更新用户";
  userParams.value = {};
  nextTick(() => {
    formRef.value.clearValidate();
  });
  userParams.value = JSON.parse(JSON.stringify(row));
  oldName.value = userParams.value.username as string;
  drawer.value = true;
};

const save = async () => {
  await formRef.value.validate();
  let tip = drawerTitle.value === "添加用户" ? "添加" : "更新";
  // 更新前的用户名
  let result = await reqAddAndUpdateUser(userParams.value);
  if (result.code === 200) {
    drawer.value = false;
    ElMessage.success(`${tip}成功`);
    getHasUser(drawerTitle.value === "添加用户" ? 1 : pageNo.value);
    // 如果是在修改自己，那么就刷新浏览器退出登录
    if (userStore.username === oldName.value) window.location.reload();
  } else {
    ElMessage.error(`${tip}失败`);
  }
};
const cancelClick = () => {
  drawer.value = false;
};

const handleCheckAllChange = (val: boolean) => {
  checkedRole.value = val ? rolesArr.value : [];
  isIndeterminate.value = false;
};
const handlecheckedRoleChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === rolesArr.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < rolesArr.value.length;
};
const setRole = async (row: User) => {
  drawer2.value = true;
  userParams.value = row;
  checkedRole.value = [];
  let result = await reqAllRoles(row.id!);
  rolesArr.value = result.data.allRolesList;
  checkedRole.value = result.data.assignRoles;
  if (checkedRole.value.length > 0) {
    checkAll.value = rolesArr.value.length === checkedRole.value.length;
    isIndeterminate.value = !checkAll.value;
  } else {
    checkAll.value = false;
    isIndeterminate.value = false;
  }
};

const saveRole = async () => {
  let roleIdList = checkedRole.value.map((item) => item.id);
  let result = await reqAssignRole(userParams.value.id!, roleIdList);
  if (result.code === 200) {
    ElMessage.success("分配角色成功");
    drawer2.value = false;
    getHasUser(pageNo.value);
  }
};

const cancelForRole = () => {
  drawer2.value = false;
};

const deleteUser = async (id: number) => {
  let result = await reqDeleteUser(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    if (pageNo.value !== 1 && userArr.value.length === 1) pageNo.value--;
    getHasUser(pageNo.value);
  } else {
    ElMessage.error("删除失败");
  }
};

const handleSelectionChange = (newSelection: any[]) => {
  selectIdArr.value = newSelection.map((item) => item.id);
};

const deleteSelectUser = async () => {
  let result = await reqBatchDeleteUser(selectIdArr.value);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    if (pageNo.value !== 1 && userArr.value.length <= selectIdArr.value.length)
      pageNo.value--;
    getHasUser(pageNo.value);
  } else {
    ElMessage.error("删除失败");
  }
};

const reset = ()=>{
    layoutSettingStore.isRefresh = !layoutSettingStore.isRefresh
}

onMounted(() => {
  getHasUser();
});
</script>

<style scoped>
.el-form-item {
  margin-bottom: 25px;
}
</style>
