import type { TradeMarkResponseData, TradeMark } from "./type";
// 品牌管理
import request from "@/utils/request";

const BASE_URL = "/pd-api/admin/product/";

// 地址
enum API {
  // 获取品牌列表的地址
  TRADEMARK_URL = BASE_URL + "baseTrademark/",
  // 添加
  ADD_TRADEMARK_URL = BASE_URL + "baseTrademark/save/",
  //修改
  UPDATE_TRADEMARK_URL = BASE_URL + "baseTrademark/update/",
  // 删除
  DELETE_TRADEMARK_URL = BASE_URL + "baseTrademark/remove/",
}

// 获取品牌接口
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );

// 添加或更新品牌接口
export const addOrUpdateTrademark = (data: TradeMark) => {
  // 判断是否有id
  if (data.id) {
    // 修改
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  } else {
    // 添加
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data);
  }
};

// 删除
export const deleteTradeMark = (id: number) =>
  request.delete<any, any>(API.DELETE_TRADEMARK_URL + id);
