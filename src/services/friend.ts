import http from '../utils/http';

export const friendList = (): any => {
  return http<any>({
    method: 'get',
    url: '/friend/list',
  });
};
export const register = (data: any): any => {
  return http<PageType<Article>>({
    method: 'post',
    url: '/user/register',
    data,
  });
};
export const getUserInfo = (): any => {
  return http<PageType<Article>>({
    method: 'get',
    url: '/user/getUserInfo',
  });
};
