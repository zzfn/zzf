import http from 'utils/http';

export const getHot = () => {
  return http({
    baseURL: process.env.NEXT_PUBLIC_NODE_URL,
    method: 'get',
    url: '/hot',
  });
};
