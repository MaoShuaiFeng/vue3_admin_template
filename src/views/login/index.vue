<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>welcome</h2>
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              :prefix-icon="Lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "../../store/modules/user";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "../../utils/time";

let useStore = useUserStore();
let $router = useRouter();

//收集账号密码数据
let loginForm = reactive({
  username: "admin",
  password: "111111",
});

let loading = ref(false);
//登录按钮回调
const login = async () => {
  //通知仓库发送登录请求，成功：跳转首页，失败：提示
  try {
    loading.value = true;
    await useStore.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      title: `HI,${getTime()}`,
      message: "欢迎回来",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    ElNotification({
      message: (error as Error).message,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  border-radius: 20px;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
