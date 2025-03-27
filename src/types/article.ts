export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  title: string;
  content: string;
  summary: string;
  viewCount: number;
  tag: string;
  sortOrder: number;
  isActive: boolean;
};
