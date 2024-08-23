// 定义时间范围的常量
const MORNING_START = 4;
const MORNING_END = 12;
const NOON_START = 12;
const NOON_END = 14;
const AFTERNOON_START = 14;
const AFTERNOON_END = 18;

export const getTime = () => {
  // 获取当前时间，考虑到时区差异
  const now = new Date();
  const hour = now.getHours();

  // 根据小时数返回不同的问候语
  if (hour >= MORNING_START && hour < MORNING_END) {
    return "早上好";
  } else if (hour >= NOON_START && hour < NOON_END) {
    return "中午好";
  } else if (hour >= AFTERNOON_START && hour < AFTERNOON_END) {
    return "下午好";
  } else {
    return "晚上好";
  }
};