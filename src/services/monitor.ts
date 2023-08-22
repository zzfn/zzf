import http from 'utils/http';

export const monitorStatus = (params: { t: number }) => {
  return http<any>({
    method: 'get',
    url: '/monitor/status',
    params,
  });
};
