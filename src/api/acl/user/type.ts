import { ResponseData } from "@/api/user/type";

//一个账号信息的ts类型
export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: string;
  roleName?: string;
}
export type Records = User[];

export interface UserResponseData extends ResponseData {
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

//职位的ts类型
export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}

export type AllRole = RoleData[];

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}
