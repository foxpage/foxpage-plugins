import { ReactElement } from 'react';

import _ from 'lodash';
import { ServerStyleSheet } from 'styled-components';

import { structure as structureUtils } from '@foxpage/foxpage-core';
import { Context, StructureNode } from '@foxpage/foxpage-types';

import { HeadConsumer } from './components/HeadConsumer';
import { InnerHTML } from './components/InnerHTML';
const { appendStructure, createStructureWithFactory, findBody, findHead } = structureUtils;

/**
 * create elements with styled-components
 *
 * @param ctx context
 * @param elements created elements
 * @returns new elements
 */
export const createElements = (ctx: Context, elements: ReactElement[]) => {
  if (ctx.sheet) {
    return elements;
  }

  const styledComponentCollectCost = ctx.performanceLogger?.('styledComponentCollectTime');
  ctx.sheet = new ServerStyleSheet();
  try {
    const reactElementWithStyle = ctx.sheet.collectStyles(elements);
    return reactElementWithStyle;
  } catch (error) {
    ctx.sheet.seal();
    ctx.logger?.warn('create elements with styled components fail.', error);
    throw error;
  } finally {
    styledComponentCollectCost();
  }
};

/**
 * render with styled-components
 * will collect styled-components content
 * @param ctx context
 * @param elements created elements
 * @returns collected result
 */
export const renderWithStyledComponents = async (ctx: Context) => {
  const styledComponentRenderCost = ctx.performanceLogger?.('styledComponentRenderTime');
  // for avoid pollute the origin dsl
  const page = ctx.page;
  const _dsl = _.cloneDeep(page?.schemas);

  const bodyChildren = findBody(_dsl, ctx);
  if (!bodyChildren) {
    return _dsl;
  }

  const html = await render(bodyChildren.children, ctx);

  // handle body node
  // set new structure for avoid render again
  handleBodyNode(bodyChildren, { html }, ctx);

  const styleElements: ReactElement[] = [];
  if (ctx.sheet) {
    styleElements.push(...ctx.sheet.getStyleElement());
    ctx.sheet.seal();
  }
  handleHeadNode(_dsl, styleElements, ctx);

  page.schemas = _dsl;
  ctx.updatePage(page);

  styledComponentRenderCost();
  return _dsl;
};

/**
 * render to html
 *
 * @param {StructureNode[]} [dsl=[]]
 * @param {Context} ctx
 * @return {*}
 */
async function render(dsl: StructureNode[] = [], ctx: Context) {
  if (typeof ctx.render === 'function') {
    return await ctx.render(dsl, ctx);
  } else {
    ctx.logger?.error('render is invalid.');
  }
  return '';
}

function handleBodyNode(node: StructureNode, value: { html: string }, ctx: Context) {
  // @ts-ignore
  const { structure, component } = createStructureWithFactory(InnerHTML, { ...value });
  // for set new children
  node.children = [];
  appendStructure(node, structure, component, ctx);
}

function handleHeadNode(dsl: StructureNode[], styleElements: ReactElement[], ctx: Context) {
  const headNode = findHead(dsl, ctx);
  if (!headNode) {
    return;
  }
  const { structure, component } = createStructureWithFactory(HeadConsumer, { styleElements });
  appendStructure(headNode, structure, component, ctx);
}
