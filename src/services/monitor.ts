import http from 'utils/http';

export const monitorStatus = () => {
  return http<any>({
    method: 'get',
    url: '/monitor/status',
  });
};
