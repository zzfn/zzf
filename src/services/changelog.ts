import http from 'utils/http';

export const changelogList = () => {
  return http<any>({
    baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    method: 'get',
    url: '/changelog/list',
  });
};
