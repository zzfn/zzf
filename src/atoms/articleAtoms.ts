import { atom } from 'jotai';
import type { Article } from '../types/article';

export const articleAtom = atom<Article | null>(null);
