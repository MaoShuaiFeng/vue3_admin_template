//创建用户小仓库
import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginForm, loginResponseData } from "../../api/user/type";
import type { UserState } from "./types/types";
import { SET_TOKEN, GET_TOKEN } from "../../utils/token";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
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
  },
});

export default useUserStore;
