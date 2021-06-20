import http from 'utils/http';

export const listDiscuss = (params: any) => {
  return http({
    method: 'get',
    url: '/discuss/non/select',
    params,
  });
};

export const saveDiscuss = (data: any) => {
  return http({
    method: 'post',
    url: '/discuss/non/save',
    data,
  });
};
