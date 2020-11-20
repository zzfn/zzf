import http from 'utils/http';

export const listArticles = (params: any): Promise<Res<Page<any>>> => {
  return http('get', '/article/listArticles', { params });
};

export const getArticle = (params: any): Promise<Res<any>> => {
  return http('get', '/article/getArticle', { params });
};

export const listTags = (params: any): Promise<Res<any>> => {
  return http('get', '/article/listTags', { params });
};

export const listArchives = (params: any): Promise<Res<any>> => {
  return http('get', '/article/listArchives', { params });
};

export const updateViews = (data: any): Promise<Res<any>> => {
  return http('post', '/views/updateViews', { data });
};
