// 商品分类仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategoryResponseData } from "@/api/product/attr/type";
import type { CategoryState } from "./types/types";

const useCategoryStore = defineStore("category", {
  state: (): CategoryState => {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  actions: {
    // 获取一级分类数据
    async getCategoryList1() {
      const result: CategoryResponseData = await reqC1();
      if (result.code === 200) {
        this.category1List = result.data;
      }
    },
    async getCategoryList2(category1Id: number) {
      const result: CategoryResponseData = await reqC2(category1Id);
      if (result.code === 200) {
        this.category2List = result.data;
      }
    },
    async getCategoryList3(category2Id: number) {
      const result: CategoryResponseData = await reqC3(category2Id);
      if (result.code === 200) {
        this.category3List = result.data;
      }
    },
  },
});
export default useCategoryStore;
