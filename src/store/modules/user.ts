//创建用户小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginForm, loginResponseData } from "../../api/user/type";
import type { UserState } from "./types/types";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../utils/token";
//引入常量路由
import { constantRoutes } from "@/router/routes";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRoutes, //仓库存储菜单需要的数组（路由）
      userName: "", //用户名称
      avatar: "", //用户头像
    };
  },
  getters: {},
  actions: {
    // 登录
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code === 200) {
        this.token = result.data.token as string;
        //本地持久化存储token
        SET_TOKEN(result.data.token as string);
        //返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    //获取用户信息
    async getUserInfo() {
      const result = await reqUserInfo();
      //如果获取用户信息成功
      if (result.code === 200) {
        this.userName = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    //退出登录
    async userLogoutFn() {
      this.token = "";
      this.userName = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
  },
});

export default useUserStore;
