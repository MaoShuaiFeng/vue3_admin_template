<template>
    <div>
        <el-card>
            <el-form inline>
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search">搜索</el-button>
                    <el-button type="primary" icon="RefreshRight" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0">
            <el-button type="primary" icon="Plus">添加用户</el-button>
            <el-button type="danger" icon="Delete">批量删除</el-button>
            <!-- 用户信息 -->
            <el-table :data="userArr" style="margin-top: 20px" border>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="#" align="center">
                    <template #default="{ $index }">
                        {{ (pageNo - 1) * pageSize + $index + 1 }}
                    </template></el-table-column>
                <el-table-column prop="id" label="ID" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="name" label="用户名字" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="username" label="账号名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="roleName" label="用户角色" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="操作" width="300px" align="center" fixed="right">
                    <template #default="{ row, $index }">
                        <el-button type="success" icon="User" size="small" plain>分类角色</el-button>
                        <el-button type="primary" icon="Edit" size="small" plain>编辑</el-button>
                        <el-button type="danger" icon="Delete" size="small" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 20]"
                :background="true" :total="total" layout="prev, pager, next, jumper, ->, sizes , total" :pager-count="7"
                :disabled="undefined" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                style="margin-top: 20px" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqUserInfo } from "@/api/acl/user";
import { Records, UserResponseData } from "@/api/acl/user/type";
import { onMounted, ref } from "vue";

let pageNo = ref(1);
let pageSize = ref(3);
let total = ref(0);
let userArr = ref<Records>([]);

const getHasUser = async (pager = 1) => {
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(
        pageNo.value,
        pageSize.value
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

onMounted(() => {
    getHasUser();
});
</script>

<style scoped></style>
