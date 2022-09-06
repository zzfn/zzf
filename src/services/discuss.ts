import http from 'utils/http';

export const listDiscuss = (params: any) => {
  return http<any>({
    baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    method: 'get',
    url: '/discuss/select',
    params,
  });
};

export const saveDiscuss = (data: any) => {
  return http<any>({
    baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    method: 'post',
    url: '/discuss/save',
    data,
  });
};
