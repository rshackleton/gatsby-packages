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
    KontentAsset: {
      fixed: fixedResolver,
      fluid: fluidResolver,
      resize: resizeResolver,
    },
    KontentRichTextImage: {
      fixed: fixedResolver,
      fluid: fluidResolver,
      resize: resizeResolver,
    },
  });

  // Extend `KontentAsset` type with field for local `File` node.
  if (options.local) {
    const { createNode } = actions;

    createResolvers({
      KontentAsset: {
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
      KontentRichTextImage: {
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
