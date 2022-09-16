import { createModel } from '@rematch/core';
import type { RootModel } from './index';
import { getUserInfo } from 'api/user';

type ComplexState = {
  isMobile: boolean;
  isDesktop: boolean;
  isReady: boolean;
};
export const screen = createModel<RootModel>()({
  state: {
    isReady: false,
    isMobile: false,
    isDesktop: false,
  } as ComplexState,
  reducers: {
    updateScreen(state, payload: { isMobile: boolean; isDesktop: boolean }) {
      return { ...state, isReady: true, isMobile: payload.isMobile, isDesktop: payload.isDesktop };
    },
  },
});
