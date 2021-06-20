import http from 'utils/http';

export const listDiscuss = (params: any) => {
  return http({
    method: 'get',
    url: '/discuss/non/select',
    params,
  });
};

export const getArticle = (params: any) => {
  return http({
    method: 'get',
    url: `/article/non/${params.id}`,
  });
};

export const listTags = (params: any) => {
  return http({
    method: 'get',
    url: '/article/non/tags',
    params,
  });
};

export const listArchives = (params: any) => {
  return http({
    method: 'get',
    url: '/article/non/list',
    params,
  });
};

export const esList = (params: any) => {
  return http({
    method: 'get',
    url: '/article/non/search',
    params,
  });
};
export const favoriteList = (params: any) => {
  return http({
    method: 'get',
    url: '/favorite/non/list',
    params,
  });
};
export const overview = () => {
  return http({
    method: 'get',
    url: '/config/non/overview',
  });
};
export const lastUpdated = () => {
  return http({
    method: 'get',
    url: '/article/non/lastUpdated',
  });
};
