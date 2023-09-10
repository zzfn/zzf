import { atomWithStorage } from 'jotai/utils';

export const themeModeAtom = atomWithStorage('theme', 'auto', {
  getItem(key, initialValue) {
    return localStorage.getItem(key) || initialValue;
  },
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});
