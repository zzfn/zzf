import { atom } from 'jotai';
import type { PostType } from 'interface/type';

export const articleState = atom<PostType | null>(null);
