import http from 'utils/http';

export const selectSysConfig = (params: any): Promise<Res<any>> => {
  return http('get', '/sysConfig/selectSysConfig', { params });
};
