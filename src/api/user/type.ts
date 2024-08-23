//登录接口携带参数类型
export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  token?: string;
  message?: string;
}

//返回数据类型
export interface loginResponseData {
  code: number;
  data: dataType;
}

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  desc: string;
  phone: string;
  role: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

interface user {
  checkUser: userInfo;
}

//用户信息
export interface userResponseData {
  code: number;
  data: user;
}
