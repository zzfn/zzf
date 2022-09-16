import type { Models } from '@rematch/core';
import { count } from './count';
import { user } from './user';
import { screen } from './screen';

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  user: typeof user;
  screen: typeof screen;
}

export const models: RootModel = { count, user, screen };
