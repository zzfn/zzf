import http from '../utils/http';

export const login = (data: any): any => {
  return http<PageType<Article>>({
    method: 'post',
    url: '/user/login',
    data,
  });
};
export const register = (data: any): any => {
  return http<PageType<Article>>({
    method: 'post',
    url: '/user/register',
    data,
  });
};
export const getUserInfo = (data: any): any => {
  return http<PageType<Article>>({
    method: 'get',
    url: '/user/getUserInfo',
    data,
  });
};
