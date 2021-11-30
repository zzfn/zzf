import http from 'utils/http';

type payload = {
  url: string;
  visitorId: string;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  referrer: string;
  name: string;
  value: number;
};
export const monitorLoad = (data: payload) => {
  return http({
    method: 'post',
    url: 'trace/save',
    data,
  });
};
