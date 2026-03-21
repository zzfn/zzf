export type Comment = {
  id: string;
  content: string; // HTML 格式的评论内容（Discourse cooked）
  raw?: string; // 原始 Markdown 内容（Discourse raw）
  username: string;
  createdAt: string;
  // Discourse 相关字段
  discoursePostId?: number;
  discoursePostNumber?: number;
  // 用户信息
  avatarUrl?: string;
  name?: string; // 显示名称
  userTitle?: string; // 用户头衔
  // 回复
  replies?: Comment[];
  // 以下字段已废弃（本地评论系统）
  address?: string;
  appUser?: {
    avatarUrl?: string;
  };
};
