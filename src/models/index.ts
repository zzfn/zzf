import type { Models } from '@rematch/core';
import { count } from './count';
import { user } from './user';

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  user: typeof user;
}

export const models: RootModel = { count, user };
