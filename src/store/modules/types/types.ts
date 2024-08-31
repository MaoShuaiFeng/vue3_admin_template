//定义小仓库数据state类型
import { RouteRecordRaw } from "vue-router";
import { CategoryObj } from "@/api/product/attr/type";

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface CategoryState {
  category1Id: number | string;
  category2Id: number | string;
  category3Id: number | string;
  category1List: CategoryObj[];
  category2List: CategoryObj[];
  category3List: CategoryObj[];
}
