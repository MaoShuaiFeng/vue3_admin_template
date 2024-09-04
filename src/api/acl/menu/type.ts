import { ResponseData } from "@/api/user/type";

export interface Permission {
  id: number;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: PermissionList;
  select?: boolean;
  createTime?: string;
  updateTime?: string;
}

export type PermissionList = Permission[];

export interface PermissionResponseData extends ResponseData {
  data: PermissionList;
}

//添加或者更新菜单
export interface MenuParams {
  id?: number;
  code: string;
  name: string;
  pid?: number;
  level?: number;
}
