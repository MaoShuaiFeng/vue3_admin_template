import request from "@/utils/request";
import { SkuResponseData } from "./type";

const BASE_URL = "/pd-api/admin/product/";

enum API {
  //获取已有商品的数据---SKU
  SKU_URL = BASE_URL + "list/",
}

export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`);
