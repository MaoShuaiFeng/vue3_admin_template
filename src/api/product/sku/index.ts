import request from "@/utils/request";
import { SkuInfoData, SkuResponseData } from "./type";

const BASE_URL = "/pd-api/admin/product/";

enum API {
  //获取已有商品的数据---SKU
  SKU_URL = BASE_URL + "list/",
  // 上架
  SALE_URL = BASE_URL + "onSale/",
  // 下架
  OFF_SALE_URL = BASE_URL + "cancelSale/",
  // 详情
  DETAIL_URL = BASE_URL + "getSkuById/",
  //删除
  DELETE_URL = BASE_URL + "deleteSku/",
}

export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`);

export const reqSaleSku = (id: number) =>
  request.get<any, any>(API.SALE_URL + id);

export const reqCancelSaleSku = (id: number) =>
  request.get<any, any>(API.OFF_SALE_URL + id);

export const reqSkuInfo = (id: number) =>
  request.get<any, SkuInfoData>(API.DETAIL_URL + id);

export const reqDeleteSku = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id);
