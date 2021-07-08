import http from 'utils/http';

export const monitorLoad = (data: any) => {
  return http({
    method: 'post',
    url: '/trace/non/save',
    data,
  });
};
