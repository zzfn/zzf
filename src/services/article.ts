import http from 'utils/http';

type ArticleDetail = {
  content: string;
  createTime: string;
  id: string;
  isDelete: number;
  isRelease: boolean;
  orderNum: number;
  tag: string;
  logo: string;
  summary: string;
  tagDesc: string;
  title: string;
  updateBy: string;
  updateTime: string;
  viewCount: number;
};
export const getArticle = (params: { id: string }) => {
  return http<ArticleDetail>({
    method: 'get',
    url: `/article/getOne`,
    params,
  });
};
type TagType = {
  code: string;
  count: number;
  tag: string;
};
export const listTags = (params: Record<string, never>) => {
  return http<TagType[]>({
    method: 'get',
    url: '/article/tags',
    params,
  });
};

export const listArchives = (params: Record<string, string>) => {
  return http<any[]>({
    method: 'get',
    url: '/article/list',
    params,
  });
};

export const esList = (params: { keyword: string }) => {
  return http<Article[]>({
    method: 'get',
    url: '/search/article',
    params,
  });
};

type LastUpdatedListType = {
  id: string;
  title: string;
  updateTime: string;
};
export const lastCreated = () => {
  return http<ArticleDetail[]>({
    method: 'get',
    url: '/article/lastCreated',
  });
};
type ViewType = {
  id: string;
};

export const updateView = (data: ViewType) => {
  return http<boolean>({
    method: 'post',
    url: '/article/updateViewed',
    data,
  });
};
export const topSearch = () => {
  return http<string[]>({
    method: 'get',
    url: '/article/topSearch',
  });
};

export const articleCount = () => {
  return http<number>({
    method: 'get',
    url: '/article/count',
  });
};
export const sortByField = (params: { field: string }) => {
  return http<any>({
    method: 'get',
    url: '/article/sortByField',
    params,
  });
};
