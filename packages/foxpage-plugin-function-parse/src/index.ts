import { FoxpagePlugin } from '@foxpage/foxpage-plugin';
import {
  FoxpageHooks,
  FoxpagePluginApi,
  VariableItem,
  VariableParseEntity,
  VariableProps,
} from '@foxpage/foxpage-types';

export interface FunctionVariable extends VariableItem {
  type: 'data.function.call';
  props: VariableProps<{
    function?: { code: string; variables: { key: string; value?: any }[] };
    args: any[];
  }>;
}

/**
 * register function parser plugin
 * @returns function parser
 */
const functionParser = ({ api }: { api: FoxpagePluginApi }): FoxpagePlugin<FoxpageHooks> => {
  return {
    visitor: {
      registerVariableParser: () => {
        return {
          type: 'data.function.call',
          parse(variable, context) {
            const {
              name,
              props: { function: _function, args = [] },
            } = variable;
            const { code, variables = [] } = _function || {};

            if (code) {
              const vars = variables.map((item, idx) => ({ ...item, varStr: `v_${idx}` }));
              const result = api?.executeFun ? api.executeFun(code, [context, ...args], vars) : '';
              return result;
            }

            throw new Error(`${name} function is correct`);
          },
        } as VariableParseEntity<FunctionVariable>;
      },
    },
  };
};

export default functionParser;
