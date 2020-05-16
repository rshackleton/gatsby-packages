import { CreateResolversArgs, GatsbyNode } from 'gatsby';
import { createRemoteFileNode, FileSystemNode } from 'gatsby-source-filesystem';

import { resolveOptions } from './resolveOptions';
import { fluidResolver, fixedResolver, resizeResolver } from './resolvers';
import {
  CustomPluginOptions,
  KontentAsset,
  KontentRichTextImage,
} from './types';

/**
 * Add custom field resolvers to the GraphQL schema.
 * @param args
 * @param pluginOptions
 * @see https://www.gatsbyjs.org/docs/node-apis/#createResolvers
 */
const createResolvers: GatsbyNode['createResolvers'] = (
  args: CreateResolversArgs,
  pluginOptions: CustomPluginOptions,
): Promise<void> => {
  const {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  } = args;

  const options = resolveOptions(pluginOptions);

  // Extend `KontentAsset` type with fields for Gatsby Image.
  createResolvers({
    // eslint-disable-next-line @typescript-eslint/camelcase
    kontent_item_asset_element: {
      fixed: fixedResolver,
      fluid: fluidResolver,
      resize: resizeResolver,
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    kontent_item_rich_text_element_link: {
      fixed: fixedResolver,
      fluid: fluidResolver,
      resize: resizeResolver,
    },
  });

  // Extend `KontentAsset` type with field for local `File` node.
  if (options.local) {
    const { createNode } = actions;

    createResolvers({
      // eslint-disable-next-line @typescript-eslint/camelcase
      kontent_item_asset_element: {
        localFile: {
          type: `File`,
          resolve(source: KontentAsset): Promise<FileSystemNode> {
            return createRemoteFileNode({
              url: source.url,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            });
          },
        },
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      kontent_item_rich_text_element_link: {
        localFile: {
          type: `File`,
          resolve(source: KontentRichTextImage): Promise<FileSystemNode> {
            return createRemoteFileNode({
              url: source.url,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            });
          },
        },
      },
    });
  }

  return Promise.resolve();
};

export default createResolvers;
