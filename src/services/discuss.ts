import http from 'utils/http';

export const listDiscuss = (params: any) => {
  return http<any>({
    method: 'get',
    url: '/discuss/select',
    params,
  });
};

export const saveDiscuss = (data: any) => {
  return http<any>({
    method: 'post',
    url: '/discuss/save',
    data,
  });
};
