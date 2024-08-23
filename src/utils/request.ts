//进行axios的二次封装：请求与响应拦截器
import axios from "axios";
// import { importMetaEnv } from "vite";
import { ElMessage } from "element-plus";

// const env = importMetaEnv();

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    //请求拦截器
    //config：配置对象，对象里面有一个属性很重要，headers请求头
    return config;
  },
  (error) => {
    //请求失败
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    //响应成功
    return response.data;
  },
  (error) => {
    //响应失败

    let message = "";
    const status = error.response.status;
    switch (status) {
      case 401:
        message = "未授权，请重新登录";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址出错";
        break;
      case 408:
        message = "请求超时";
        break;
      case 500:
        message = "服务器内部错误";
        break;
      case 501:
        message = "服务未实现";
        break;
      case 502:
        message = "网关错误";
        break;
      case 503:
        message = "服务不可用";
        break;
      case 504:
        message = "网关超时";
        break;
      default:
        message = "其他错误";
    }
    ElMessage.error({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;
