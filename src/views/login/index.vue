<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          class="login_form"
        >
          <h1>Hello</h1>
          <h2>welcome</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "../../utils/time";

let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

let loginFormRef = ref();

//收集账号密码数据
let loginForm = reactive({
  username: "admin",
  password: "111111",
});

let loading = ref(false);
//登录按钮回调
const login = async () => {
  //通知仓库发送登录请求，成功：跳转首页，失败：提示
  await loginFormRef.value.validate();
  try {
    //表单校验通过再发请求
    loading.value = true;
    await userStore.userLogin(loginForm);
    // //登陆成功获取用户信息
    await userStore.getUserInfo();
    //判断当前路由是否有query参数
    if ($route.query && $route.query.redirect) {
      //有query参数，跳转到query参数中的地址
      $router.push($route.query.redirect as string);
    } else {
      //没有query参数，跳转到首页
      $router.push("/");
    }
    ElNotification({
      title: `HI,${userStore.username}!  ${getTime()}!`,
      message: "欢迎回来",
      type: "success",
    });
  } catch (error) {
    ElNotification({
      message: (error as Error).message,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
//自定义校验规则函数
const validatorUsername = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error("账号长度不能小于5位"));
  } else {
    callback();
  }
};
const validatorPassword = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error("密码长度不能小于5位"));
  } else {
    callback();
  }
};
//验证规则
const rules = {
  username: [
    {
      trigger: "change",
      validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: "change",
      validator: validatorPassword,
    },
  ],
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.png") no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 70%;
  top: 30vh;
  margin: 0 auto;
  padding: 40px;
  background: rgba(206, 204, 204, 0.3);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);

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
