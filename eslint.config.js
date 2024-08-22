import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

// 导入全局变量
export default [
  // 匹配文件
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  // 设置全局变量
  {languageOptions: { globals: globals.browser }},
  // 导入js插件
  pluginJs.configs.recommended,
  // 导入ts插件
  ...tseslint.configs.recommended,
  // 导入vue插件
  ...pluginVue.configs["flat/essential"],
  // 匹配vue文件
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];