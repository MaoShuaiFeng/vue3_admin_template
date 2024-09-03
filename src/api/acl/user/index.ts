import request from "@/utils/request";
import { User, UserResponseData } from "./type";

const BASE_URL = "/api/admin/acl/user/";

enum API {
  //用户列表
  ALL_USER_URL = BASE_URL,
  //   添加用户
  ADD_USER_URL = BASE_URL + "save",
  //   更新用户
  UPDATE_USER_URL = BASE_URL + "update",
  //   删除用户
  //   DELETE_USER_URL = BASE_URL + "user/remove/",
}

export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALL_USER_URL + `${page}/${limit}`);

export const reqAddAndUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data);
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data);
  }
};
