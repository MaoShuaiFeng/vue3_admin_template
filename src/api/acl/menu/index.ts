import request from "@/utils/request";
import { MenuParams, PermissionResponseData } from "./type";

const BASE_URL = "/api/admin/acl/permission/";

enum API {
  ALL_PERMISSION_URL = BASE_URL + "toAssign/", //获取菜单与按钮标识数据
  DELETE_MENU_URL = BASE_URL + "remove/", //删除菜单与按钮标识
  ADD_MENU_URL = BASE_URL + "save", //添加菜单与按钮标识
  UPDATE_MENU_URL = BASE_URL + "update", //更新菜单与按钮标识
}

export const reqAllPermission = (roleId: number) =>
  request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL + roleId); //获取菜单与按钮标识数据

export const reqDeleteMenu = (id: number) =>
  request.delete<any, any>(API.DELETE_MENU_URL + id); //删除菜单与按钮标识

export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_MENU_URL, data);
  } else {
    return request.post<any, any>(API.ADD_MENU_URL, data);
  }
};
