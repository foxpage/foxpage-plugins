import { FoxpagePlugin } from '@foxpage/foxpage-plugin';
import { FoxpageHooks } from '@foxpage/foxpage-types';

/**
 * register function parser plugin
 * @returns function parser
 */
const functionParser = (): FoxpagePlugin<FoxpageHooks> => {
  return {
    visitor: {
      registerVariableParser: () => {
        return {
          type: 'data.header',
          parse(_variable, ctx) {
            if (!ctx.request?.req?.headers || !ctx.response?.res) {
              return;
            }
            const headerProxy: Record<string, string | string[] | undefined> = new Proxy(ctx.request.req.headers, {
              set(target, key, value, receiver) {
                if (typeof key === 'string' && ctx.response.res) {
                  ctx.response.res.setHeader(key, value);
                  return true;
                }
                return Reflect.set(target, key, value, receiver);
              },
            });
            return headerProxy;
          },
        };
      },
    },
  };
};

export default functionParser;
