import { RenderPageError, renderToHtmlByPage } from '@foxpage/foxpage-node-sdk';
import { Context, Page, Route } from '@foxpage/foxpage-types';

const COMMON_SUFFIX = '/_foxpage';

const initPage = (pageId: string, csrPackageName: string) => {
  const page: Page & { type: string } = {
    id: pageId,
    schemas: [
      {
        id: 'csr_root_node',
        show: true,
        name: csrPackageName,
        label: csrPackageName,
        props: {
          ssrEnable: false,
        },
        type: 'react.component',
        version: '',
      },
    ],
    relation: {},
    type: 'page',
  };
  return page;
};

export const handleRegisterRouter = async () => {
  return {
    pathname: `${COMMON_SUFFIX}/designer`,
    action: async (ctx: Context) => {
      try {
        const { appid, pageid, locale } = ctx.request.query as unknown as {
          appid: string;
          pageid: string;
          csrPackageName: string;
          locale: string;
        };
        if (!appid) {
          throw new Error('App id is empty!');
        }

        if (!pageid) {
          throw new Error('page id is empty!');
        }
        const page = initPage(pageid, '@fox-design/react-designer-entry');
        const url = ctx.URL?.href + `&designer`;
        ctx.url = url;
        ctx.locale = locale;
        ctx.isDesignerMode = true;
        ctx.isPreviewMode = true;
        ctx.isMock = ctx.URL?.searchParams?.has('mock') ?? false;
        const result = await renderToHtmlByPage(page, appid, {
          request: ctx.request,
          response: ctx.response,
          cookies: ctx.cookies,
          ctx,
        });
        // if result html is null return empty string
        if (!result.html) {
          return '';
        }
        // if result.html has no doctype insert it
        if (!result.html.startsWith('<!doctype')) {
          result.html = `<!doctype html>${result.html}`;
        }
        // if result.html has not <html>, find doctype and insert <html>, and insert </html> at the end of html
        if (!result.html.includes('<html')) {
          const doctype = result.html.match(/<!doctype[^>]*>/i)?.[0] ?? '';
          result.html = result.html.replace(doctype, `${doctype}<html>`);
          result.html = `${result.html}</html>`;
        }
        // if result.html has not <head>, find <html> and insert <head> after it
        if (!result.html.includes('<head')) {
          result.html = result.html.replace(/<html[^>]*>/i, `$&<head></head>`);
        }
        // if result.html has not <body>, find <head> and insert <body> after it
        if (!result.html.includes('<body')) {
          result.html = result.html.replace(/<head[^>]*>/i, `$&<body>`);
          // append </body> at the end of html, before </html>
          result.html = result.html.replace(/<\/html>/i, `</body></html>`);
        }

        return result.html;
      } catch (e) {
        throw new RenderPageError(new Error(`render page failed: ${(e as Error).message}`), ctx.page);
      }
    },
  } as unknown as Route;
};
