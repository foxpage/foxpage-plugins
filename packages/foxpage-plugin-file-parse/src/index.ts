import { FoxpagePlugin } from '@foxpage/foxpage-plugin';
import { FoxpageHooks } from '@foxpage/foxpage-types';

import { getFile } from './main';

/**
 * register file parser plugin
 * @returns file parser
 */
const fileParser = (): FoxpagePlugin<FoxpageHooks> => {
  return {
    visitor: {
      registerVariableParser: () => {
        return {
          type: 'data.file',
          parse: getFile,
        };
      },
    },
  };
};

export default fileParser;
