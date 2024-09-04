import request from "@/utils/request";
import { AllRoleResponseData, User, UserResponseData } from "./type";

const BASE_URL = "/api/admin/acl/user/";

enum API {
  //用户列表
  ALL_USER_URL = BASE_URL,
  //   添加用户
  ADD_USER_URL = BASE_URL + "save",
  //   更新用户
  UPDATE_USER_URL = BASE_URL + "update",
  //   删除用户
  DELETE_USER_URL = BASE_URL + "remove/",
  //   批量删除
  BATCH_DELETE_URL = BASE_URL + "batchRemove",
  //   获取职位列表
  GET_ROLE_URL = BASE_URL + "toAssign/",
  //分配角色
  ASSIGN_ROLE_URL = BASE_URL + "doAssignRole",
}

export const reqUserInfo = (page: number, limit: number,username: string) =>
  request.get<any, UserResponseData>(API.ALL_USER_URL + `${page}/${limit}/?username=${username}`);

export const reqAddAndUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data);
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data);
  }
};
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETE_USER_URL + id);
export const reqBatchDeleteUser = (idList: number[]) =>
  request.delete<any, any>(API.BATCH_DELETE_URL, { data: idList });
export const reqAllRoles = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.GET_ROLE_URL + userId);

export const reqAssignRole = (userId: number, roleIdList: number[]) =>
  request.post<any, any>(API.ASSIGN_ROLE_URL, { userId, roleIdList });
