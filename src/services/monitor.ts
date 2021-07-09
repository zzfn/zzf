import http from 'utils/http';

export const monitorLoad = (data: any) => {
  return http({
    baseURL: process.env.NEXT_PUBLIC_NODE_URL,
    method: 'post',
    url: '/monitor/trace',
    data,
  });
};
