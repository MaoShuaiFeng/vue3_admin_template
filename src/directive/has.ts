import useUserStore from "@/store/modules/user";

export function isHasButton(app: any) {
  // 全局自定义指令,实现按钮权限
  app.directive("has", {
    mounted(el: any, binding: any) {
      // 获取按钮权限
      const { value } = binding;
      // 获取当前用户按钮权限
      const buttons = useUserStore().buttons;
      // 判断当前按钮权限是否包含当前按钮
      const isHas = buttons.includes(value);
      // 如果没有权限，就删除当前按钮
      if (!isHas) {
        el.parentNode.removeChild(el);
      }
    },
  });
}
