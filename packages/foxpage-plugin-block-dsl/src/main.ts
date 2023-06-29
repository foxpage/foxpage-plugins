import { getBlockDSL, NotFoundDSLError } from '@foxpage/foxpage-node-sdk';
import { Context, Route } from '@foxpage/foxpage-types';

const COMMON_SUFFIX = '/_foxpage';

/**
 * register router
 * @returns route
 */
export const handleGetBlockDSL = async () => {
  return {
    pathname: `${COMMON_SUFFIX}/blocks/dsl`,
    action: async (ctx: Context) => {
      const { appid, id } = ctx.request.body as unknown as {
        appid: string;
        id: string;
      };
      try {
        if (!appid) {
          throw new Error('App id is empty!');
        }
        if (!id) {
          throw new Error('Block id is empty!');
        }
        const result = await getBlockDSL(id, appid, {
          request: ctx.request,
          response: ctx.response,
          cookies: ctx.cookies,
          ctx,
        });

        return result;
      } catch (e) {
        throw new NotFoundDSLError(id);
      }
    },
  } as unknown as Route;
};
