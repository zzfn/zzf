import http from 'utils/http';

export const listArticles = (params: any): Promise<Res<Page<any>>> => {
  return http('get', '/article/non/page', { params });
};

export const getArticle = (params: any): Promise<Res<any>> => {
  return http('get', `/article/non/${params.id}`);
};

export const listTags = (params: any): Promise<Res<any>> => {
  return http('get', '/article/non/tags', { params });
};

export const listArchives = (params: any): Promise<Res<any>> => {
  return http('get', '/article/non/list', { params });
};

export const esList = (params: any): Promise<Res<any>> => {
  return http('get', '/article/non/search', { params });
};
export const favoriteList = (params: any): Promise<Res<any>> => {
  return http('get', '/favorite/non/all', { params });
};
