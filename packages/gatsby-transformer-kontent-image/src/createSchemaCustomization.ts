import { CreateSchemaCustomizationArgs, GatsbyNode } from 'gatsby';

/**
 * Customize Gatsby’s GraphQL schema by creating type definitions, field extensions or adding third-party schemas.
 * @param args
 * @see https://www.gatsbyjs.org/docs/node-apis/#createSchemaCustomization
 */
const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = (
  args: CreateSchemaCustomizationArgs,
): Promise<void> => {
  const typeDefs = `
    type KontentAssetFixed {
      aspectRatio: Float
      base64: String!
      height: Float
      src: String
      srcSet: String
      srcWebp: String
      srcSetWebp: String
      width: Float
    }

    type KontentAssetFluid {
      aspectRatio: Float!
      base64: String!
      sizes: String!
      src: String!
      srcSet: String!
      srcWebp: String
      srcSetWebp: String
    }

    type KontentAssetResize {
      aspectRatio: Float!
      base64: String!
      height: Int!
      src: String!
      width: Int!
    }
  `;

  args.actions.createTypes(typeDefs);

  return Promise.resolve();
};

export default createSchemaCustomization;
