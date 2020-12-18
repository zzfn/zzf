import http from 'utils/http';

export const listArticles = (params: any): Promise<Res<Page<any>>> => {
  return http('get', '/v1/page', { params });
};

export const getArticle = (params: any): Promise<Res<any>> => {
  return http('get', '/v1/article', { params });
};

export const listTags = (params: any): Promise<Res<any>> => {
  return http('get', '/v1/tags', { params });
};

export const listArchives = (params: any): Promise<Res<any>> => {
  return http('get', '/v1/list', { params });
};

export const esList = (params: any): Promise<Res<any>> => {
  return http('get', '/es/list', { params });
};
