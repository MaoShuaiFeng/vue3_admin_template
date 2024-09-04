import { ResponseData } from "@/api/user/type";

export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: string;
}

export type Records = RoleData[];

export interface RoleResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

export interface MenuData {
  id: number;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: MenuDataList;
  select?: boolean;
  createTime?: string;
  updateTime?: string;
}

export type MenuDataList = MenuData[];

export interface PermissionResponseData extends ResponseData {
  data: MenuDataList;
}
