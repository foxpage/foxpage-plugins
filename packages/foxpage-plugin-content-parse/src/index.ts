import { FoxpagePlugin } from '@foxpage/foxpage-plugin';
import { FoxpageHooks } from '@foxpage/foxpage-types';

import { getContent } from './main';

/**
 * register content parser plugin
 * @returns content parser
 */
const contentParser = (): FoxpagePlugin<FoxpageHooks> => {
  return {
    visitor: {
      registerVariableParser: () => {
        return {
          type: 'data.file.content',
          parse: getContent,
        };
      },
    },
  };
};

export default contentParser;
