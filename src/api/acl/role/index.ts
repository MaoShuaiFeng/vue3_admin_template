import request from "@/utils/request";
import { PermissionResponseData, RoleData, RoleResponseData } from "./type";

const BASE_URL = "/api/admin/acl/";

enum API {
  ALL_ROLE_URL = BASE_URL + "role/", //获取所有角色
  UPDATE_ROLE_URL = BASE_URL + "role/update", //更新角色
  ADD_ROLE_URL = BASE_URL + "role/save", //添加角色
  DELETE_ROLE_URL = BASE_URL + "role/remove/", //删除角色
  ALL_PERMISSION_URL = BASE_URL + "permission/toAssign/", //获取权限列表
  ASSIGN_PERMISSION_URL = BASE_URL + "permission/doAssign", //分配权限
}

export const reqAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    `${API.ALL_ROLE_URL}/${page}/${limit}?roleName=${roleName}`
  );

export const reqAddAndUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, data);
  }
};
export const reqDeleteRole = (id: number) =>
  request.delete<any, any>(API.DELETE_ROLE_URL + id);
export const reqAllPermission = (roleId: number) =>
  request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL + roleId);
export const reqAssignPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(API.ASSIGN_PERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}` );