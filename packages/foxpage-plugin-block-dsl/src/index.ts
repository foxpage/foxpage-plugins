import { FoxpagePlugin } from '@foxpage/foxpage-plugin';
import { FoxpageHooks } from '@foxpage/foxpage-types';

import { handleGetBlockDSL } from './main';

const getBlockDslHandler = (): FoxpagePlugin<FoxpageHooks> => {
  return {
    visitor: {
      registerRouter: handleGetBlockDSL,
    },
  };
};

export default getBlockDslHandler;
