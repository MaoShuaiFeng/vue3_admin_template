//定义用户相关数据的ts类型
//登录接口
export interface LoginFormData {
  username: string;
  password: string;
}

//定义接口返回的通用数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

//获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    name: string;
    avatar: string;
    roles: string[];
    buttons: string[];
    routes: string[];
  };
}