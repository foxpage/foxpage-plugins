import { Context, VariableItem } from '@foxpage/foxpage-types';

export const getContent = async (_variable: VariableItem, ctx: Context) => {
  if (!ctx.page) {
    throw Error('page is invalid');
  }

  return ctx.page;
};
