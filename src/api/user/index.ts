//统一管理项目中用户相关的接口
import request from "@/utils/request";
import type {
  LoginFormData,
  loginResponseData,
  userInfoResponseData,
} from "./type";

const BASE_URL = "/api/admin/acl/index/";

// 项目用户相关的地址
enum API {
  LOGIN_URL = BASE_URL + "login",
  USERINFO_URL = BASE_URL + "info",
  LOGOUT_URL = BASE_URL + "logout",
}

// 登录接口
export const reqLogin = (data: LoginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
