import { createModel } from '@rematch/core';
import type { RootModel } from './index';
import { getUserInfo } from 'api/user';

type ComplexCountState = {
  info: Record<string, string>;
  isLogin: boolean;
};
export const user = createModel<RootModel>()({
  state: {
    info: {},
    isLogin: false,
  } as ComplexCountState,
  reducers: {
    updateUser(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async updateUserInfo() {
      if (localStorage.getItem('uid')) {
        const { data, code } = await getUserInfo();
        code === 0 && dispatch.user.updateUser({ info: data, isLogin: true });
      }
    },
  }),
});
