import http from 'utils/http';

export const listArticles = (params: any) => {
  return http({
    method: 'get',
    url: '/article/non/page',
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
    url: '/favorite/list',
    params,
  });
};
export const overview = () => {
  return http({
    method: 'get',
    url: '/config/non/overview',
  });
};
export const getHot = () => {
  return http({
    method: 'get',
    url: '/article/non/hot',
  });
};
export const lastUpdated = () => {
  return http({
    method: 'get',
    url: '/article/non/lastUpdated',
  });
};
type ViewType = {
  id: string;
};
export const updateView = (params: ViewType) => {
  return http({
    method: 'get',
    url: '/article/non/updateViewed',
    params,
  });
};