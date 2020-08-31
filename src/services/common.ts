import http from "../utils/http";

export const selectSysConfig = (params: object): Promise<Res<any>> => {
  return http("get", "/sysConfig/selectSysConfig", { params });
};
