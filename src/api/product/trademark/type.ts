export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//已有品牌的ts类型
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

//全部品牌的ts类型
export type Record = TradeMark[];

// 获取品牌的响应数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Record;
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
