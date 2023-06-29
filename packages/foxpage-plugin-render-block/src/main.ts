import { DOCTYPE, renderBlockHtml, RenderPageError } from '@foxpage/foxpage-node-sdk';
import { Context, Route } from '@foxpage/foxpage-types';

const COMMON_SUFFIX = '/_foxpage';

/**
 * register router
 * @returns route
 */
export const handleRenderBlock = async () => {
  return {
    pathname: `${COMMON_SUFFIX}/blocks/render2Html`,
    action: async (ctx: Context) => {
      try {
        const { appid, id } = ctx.request.body as unknown as {
          appid: string;
          id: string;
        };
        if (!appid) {
          throw new Error('App id is empty!');
        }
        if (!id) {
          throw new Error('Block id is empty!');
        }
        const result = await renderBlockHtml(id, appid, {
          request: ctx.request,
          response: ctx.response,
          cookies: ctx.cookies,
          ctx,
        });
        result.html = result.html ? result.html.replace(DOCTYPE, '') : '';
        return result;
      } catch (e) {
        throw new RenderPageError(new Error(`render block failed: ${(e as Error).message}`), ctx.page);
      }
    },
  } as unknown as Route;
};
