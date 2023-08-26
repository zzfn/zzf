import { atom } from 'jotai';
import { atom as atom2 } from 'recoil';

export const articleState = atom({});
export const articleRecoil = atom2({ key: 'article', default: {} });
