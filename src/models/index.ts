import type { Models } from '@rematch/core';
import { count } from './count';

export interface RootModel extends Models<RootModel> {
  count: typeof count;
}

export const models: RootModel = { count };
