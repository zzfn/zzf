import { init } from '@rematch/core';
import { models } from './models';
import type { RematchDispatch, RematchRootState } from '@rematch/core';
import type { RootModel } from './models';

export const store = init({
  models,
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
