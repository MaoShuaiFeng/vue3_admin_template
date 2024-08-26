//创建用户小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "./types/types";
import {
  LoginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../utils/token";
//引入常量路由
import { constantRoutes } from "@/router/routes";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRoutes, //仓库存储菜单需要的数组（路由）
      username: "", //用户名称
      avatar: "", //用户头像
    };
  },
  getters: {},
  actions: {
    // 登录
    async userLogin(data: LoginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code === 200) {
        this.token = result.data as string;
        //本地持久化存储token
        SET_TOKEN(result.data as string);
        //返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    //获取用户信息
    async getUserInfo() {
      const result: userInfoResponseData = await reqUserInfo();
      //如果获取用户信息成功
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录
    async userLogoutFn() {
      const result = await reqLogout();
      if (result.code !== 200) return Promise.reject(new Error(result.message));
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
      return "ok";
    },
  },
});

export default useUserStore;
