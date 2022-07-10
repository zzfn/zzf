import http from 'utils/http';

type Page = {
  current: number;
  pageSize: number;
};
export const listArticles = (params: Page) => {
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
export const getArticle = (params: { id: string }) => {
  return http<ArticleDetail>({
    method: 'get',
    url: `/article/${params.id}`,
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
type ArticleType = {
  title: string;
  articleList: any[];
};
export const listArchives = (params: Record<string, string>) => {
  return http<ArticleType>({
    method: 'get',
    url: '/article/list',
    params,
  });
};

export const esList = (params: { keyword: string }) => {
  return http<Article[]>({
    method: 'get',
    url: '/article/search',
    params,
  });
};

type LastUpdatedListType = {
  id: string;
  title: string;
  updateTime: string;
};
export const lastUpdated = () => {
  return http<LastUpdatedListType[]>({
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
    url: '/article/updateViewed',
    params,
  });
};
