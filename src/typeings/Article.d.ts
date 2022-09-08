interface Article {
  id: string;
  title: string;
  logo: string;
  summary: string;
  tagDesc: string;
  viewCount: number;
  createTime: string;
  content: string;
  orderNum: number;
  updateTime: string;
  tag: {
    id: string;
    name: string;
  };
}

interface PageType<T> {
  current: number;
  optimizeCountSql: boolean;
  records: T[];
  searchCount: boolean;
  size: number;
  total: number;
}
