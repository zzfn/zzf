interface Article {
  id: string;
  title: string;
  tagDesc: string;
  viewCount: number;
  createTime: string;
  content: string;
  orderNum: number;
  updateTime: string;
  tag: string;
}

export interface PageType<T> {
  current: number;
  optimizeCountSql: boolean;
  records: T[];
  searchCount: boolean;
  size: number;
  total: number;
}
