//分类的ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: null | SaleAttr[];
  spuImageList: null | SpuImage[];
}

export interface Records {
  records: SpuData[];
  total: number;
  size: number;
  current: number;
  pages: number;
  searchCount: boolean;
}

export interface HasSupResponseData extends ResponseData {
  data: Records;
}

//品牌数据ts类型
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

export interface TradeMarkListResponseData extends ResponseData {
  data: TradeMark[];
}

//商品图片
export interface SpuImage {
  id?: number;
  imgName?: string;
  imgUrl?: string;
  spuId?: number;
  createTime?: string;
  updateTime?: string;
  name?: string;
  url?: string;
}

//已有的照片墙数据类型
export interface ImageListResponseData extends ResponseData {
  data: SpuImage[];
}

// 属性数据ts类型
export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName?: string;
  saleAttrName?: string;
  isChecked?: null;
}

export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName?: string;
  spuSaleAttrValueList: SaleAttrValue[];
  editFlag?: boolean;
  saleAttrValue?: string;
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

//已有的全部SPU的返回数据类型
export interface HsaSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HsaSaleAttr[];
}

export interface Attr {
  id?: number;
  attrId: number;
  attrName: string;
  valueId: number;
  valueName: string;
}
export interface SaleAttr {
  saleAttrId: number;
  SaleAttrValueId: number;
  saleIdAndValueId: string;
  saleAttrValueName?: string;
}

export interface SkuData {
  id?: number;
  category3Id: number | string;
  spuId: number | string;
  tmId: number | string;
  skuName: string;
  price: number | string;
  weight: number | string;
  skuDesc: string;
  skuAttrValueList: Attr[];
  skuSaleAttrValueList: SaleAttr[];
  skuDefaultImg: string;
  isSale?: number;
  skuImageList?: SpuImage[];
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}
