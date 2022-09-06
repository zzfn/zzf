import http from 'utils/http';

export const changelogList = () => {
  return http<any>({
    method: 'get',
    url: '/changelog/list',
  });
};
