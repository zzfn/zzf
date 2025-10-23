export type CommentType = {
  id: string;
  content: string;
  username: string;
  createdAt: string;
  address?: string;
  appUser?: {
    avatarUrl?: string;
  };
  replies?: CommentType[];
};
