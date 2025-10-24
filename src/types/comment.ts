export type Comment = {
  id: string;
  content: string;
  username: string;
  createdAt: string;
  address?: string;
  appUser?: {
    avatarUrl?: string;
  };
  replies?: Comment[];
};
