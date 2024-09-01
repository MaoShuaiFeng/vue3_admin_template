import { reqAddOrUpdateAttr } from "./../attr/index";
//属性管理
import request from "@/utils/request";
import type {
  HasSaleAttrResponseData,
  HasSupResponseData,
  ImageListResponseData,
  SaleAttrResponseData,
  SpuData,
  TradeMarkListResponseData,
} from "./type";

const BASE_URL = "/pd-api/admin/product/";

enum API {
  // 获取已有的SPU的数据
  HASSPU_URL = BASE_URL,
  // 获取全部品牌数据
  ALLTRADEMARK_URL = BASE_URL + "baseTrademark/getTrademarkList",
  // 胡哦去某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = BASE_URL + "spuImageList/",
  // 获取某个SPU下的全部的销售属性
  SPUATTR_URL = BASE_URL + "spuSaleAttrList/",
  // 获取全部的销售属性
  ALLSALEATTR_URL = BASE_URL + "baseSaleAttrList",
  //添加和修改
  ADD_SPU_URL = BASE_URL + "saveSpuInfo",
  UPDATE_SPU_URL = BASE_URL + "updateSpuInfo",
  DELETE_SPU_URL = BASE_URL + "deleteSpu/",
}

export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number
) =>
  request.get<any, HasSupResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );

export const reqAllTradeMark = () =>
  request.get<any, TradeMarkListResponseData>(API.ALLTRADEMARK_URL);

export const reqImageList = (spuId: number) =>
  request.get<any, ImageListResponseData>(API.IMAGE_URL + spuId);

export const reqSpuAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUATTR_URL + spuId);

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

export const reqAddOrUpdateSpu = (data: SpuData) => {
  // data中不带id就是添加，带id就是更新
  if (!data.id) {
    return request.post<any, any>(API.ADD_SPU_URL, data);
  } else {
    return request.post<any, any>(API.UPDATE_SPU_URL, data);
  }
};

export const reqDeleteSpu = (spuId: number) =>
  request.delete<any, any>(API.DELETE_SPU_URL + spuId);