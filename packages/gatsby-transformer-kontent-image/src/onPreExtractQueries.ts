import fs from 'fs-extra';
import { GatsbyNode } from 'gatsby';

/**
 * Run before GraphQL queries/fragments are extracted from JavaScript files.
 * Useful for plugins to add more JavaScript files with queries/fragments e.g. from node_modules.
 * @param args
 * @see https://www.gatsbyjs.org/docs/node-apis/#onPreExtractQueries
 */
const onPreExtractQueries: GatsbyNode['onPreExtractQueries'] = async args => {
  const { store } = args;

  const program: { directory: string } = store.getState().program;

  await fs.copy(
    require.resolve(`../fragments.js`),
    `${program.directory}/.cache/fragments/kontent-asset-fragments.js`,
  );
};

export default onPreExtractQueries;
