import { Context as KoaContext } from 'koa';

import { FoxpageDelegatedRequest } from '@foxpage/foxpage-node-sdk';

declare module 'http' {
  export interface IncomingMessage {}
}

declare module '@foxpage/foxpage-types' {
  export interface Context extends KoaContext {
    request: { body: any } & FoxpageDelegatedRequest;
  }
}
