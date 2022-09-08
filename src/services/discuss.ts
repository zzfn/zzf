import http from 'utils/http';

export const listDiscuss = (params: any) => {
  return http<any>({
    method: 'get',
    url: '/comment/list',
    params,
  });
};

export const saveDiscuss = (data: any) => {
  return http<any>({
    method: 'post',
    url: '/comment/save',
    data,
  });
};
