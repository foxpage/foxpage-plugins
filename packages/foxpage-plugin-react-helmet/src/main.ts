import _ from 'lodash';

import { structure as structureUtils } from '@foxpage/foxpage-core';
import { Context, StructureNode } from '@foxpage/foxpage-types';

import { InnerHTML } from './components/InnerHTML';
import { HeadManager } from './head-manager';
const { appendStructure, createStructureWithFactory, findBody } = structureUtils;

/**
 * create a head manager set to context
 * @param ctx context
 */
export const createHeadManager = (ctx: Context) => {
  ctx.headManager = new HeadManager();
};

/**
 * render page with helmet
 * @param ctx context
 * @returns render result: html string
 */
export const renderWithHelmet = async (ctx: Context) => {
  const helmetCost = ctx.performanceLogger?.('helmetTime');
  // for avoid pollute the origin dsl
  const page = ctx.page;
  const _dsl = _.cloneDeep(page?.schemas);

  const mountPoint = findBody(_dsl, ctx);
  // no mount point node
  if (mountPoint) {
    const mountPointHtml = await render(mountPoint.children, ctx);

    // to collect from helmet
    // all collected will be managed by headManager
    // eg.: css link, title, meta, script, style ...
    ctx.headManager.collectFromHelmet();

    // handle mount point node
    // set new structure for avoid render again
    handleMountPointNode(mountPoint, { html: mountPointHtml }, ctx);

    // handle head node render
    handleHeadNode(ctx, _dsl);
  }

  page.schemas = _dsl;
  ctx.updatePage(page);

  helmetCost();
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

function handleMountPointNode(node: StructureNode, value: { html: string }, ctx: Context) {
  // @ts-ignore
  const { structure, component } = createStructureWithFactory(InnerHTML, { ...value });
  // for set new children
  node.children = [];
  appendStructure(node, structure, component, ctx);
}

function handleHeadNode(ctx: Context, dsl: Context['page']['schemas']) {
  const { headManager } = ctx;
  headManager.collectComponentResources(ctx);
  headManager.outputToDSL(ctx, dsl);
}
