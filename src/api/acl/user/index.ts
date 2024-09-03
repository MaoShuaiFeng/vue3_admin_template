import request from "@/utils/request";
import { UserResponseData } from "./type";

const BASE_URL = "/api/admin/acl/";

enum API {
  ALL_USER_URL = BASE_URL + "user/",
}

export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALL_USER_URL + `${page}/${limit}`);
