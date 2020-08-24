import http from "../utils/http";

export const listArticles = (params: object): Promise<Res<Page<any>>> => {
  return http("get", "/article/listArticles", { params });
};

export const getArticle = (params: object): Promise<Res<any>> => {
  return http("get", "/article/getArticle", { params });
};

export const listTags = (params: object): Promise<Res<any>> => {
  return http("get", "/article/listTags", { params });
};