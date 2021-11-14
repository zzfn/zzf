import http from 'utils/http';

export const listArticles = (params: any) => {
  return http<PageType<Article>>({
    method: 'get',
    url: '/article/page',
    params,
  });
};
type ArticleDetail = {
  content: string;
  createTime: string;
  id: string;
  isDelete: number;
  isRelease: boolean;
  orderNum: number;
  tag: string;
  tagDesc: string;
  title: string;
  updateBy: string;
  updateTime: string;
  viewCount: number;
};
export const getArticle = (params: any) => {
  return http<ArticleDetail>({
    method: 'get',
    url: `/article/${params.id}`,
  });
};

export const listTags = (params: any) => {
  return http({
    method: 'get',
    url: '/article/tags',
    params,
  });
};
type ArticleType = {
  createTime: string;
  id: string;
  title: string;
};
export const listArchives = (params: any) => {
  return http<ArticleType[]>({
    method: 'get',
    url: '/article/list',
    params,
  });
};

export const esList = (params: any) => {
  return http({
    method: 'get',
    url: '/article/search',
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
type LastUpdatedListType = {
  id: string;
  title: string;
  updateTime: string;
};
export const lastUpdated = () => {
  return http<LastUpdatedListType>({
    method: 'get',
    url: '/article/lastUpdated',
  });
};
type ViewType = {
  id: string;
};

export const updateView = (params: ViewType) => {
  return http<number>({
    method: 'get',
    url: '/article/non/updateViewed',
    params,
  });
};
