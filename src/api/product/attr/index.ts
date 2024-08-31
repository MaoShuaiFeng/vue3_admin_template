//属性管理
import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData, Attr } from "./type";

const BASE_URL = "/pd-api/admin/product/";

enum API {
  // 一级分类
  C1_URL = BASE_URL + "getCategory1",
  C2_URL = BASE_URL + "getCategory2/",
  C3_URL = BASE_URL + "getCategory3/",
  ATTR_URL = BASE_URL + "attrInfoList/",
  ADDORUPDATEATTR_URL = BASE_URL + "saveAttrInfo",
  DELETEATRR_URL = BASE_URL + "deleteAttr/",
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (category1Id: number) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id);
export const reqC3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id);

export const reqAttr = (
  category1Id: number,
  category2Id: number,
  category3Id: number
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );

export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data);

export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETEATRR_URL + id);