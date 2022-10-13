import { Context, VariableItem } from '@foxpage/foxpage-types';

export const getFile = async (_variable: VariableItem, ctx: Context) => {
  if (!ctx.page) {
    throw Error('page is invalid');
  }

  const file = {
    id: ctx.page.fileId,
    pageId: ctx.page.fileId,
  };

  return file;
};
