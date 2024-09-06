//分类的ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

//属性和属性值
export interface AttrValue {
  id?: number;
  attrId?: number | string;
  isEdit?: boolean;
  valueName: string;
}

export type AttrValueList = AttrValue[];

export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
  attrIdAndValueId?: string;
}

export type AttrList = Attr[];
export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
