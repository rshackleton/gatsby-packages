import { graphql } from 'gatsby';

export const KontentAssetFixed = graphql`
  fragment KontentAssetFixed on KontentAssetFixed {
    base64
    height
    src
    srcSet
    width
  }
`;

export const KontentAssetFluid = graphql`
  fragment KontentAssetFluid on KontentAssetFluid {
    aspectRatio
    base64
    sizes
    src
    srcSet
  }
`;

export const KontentAssetFixed_withWebp = graphql`
  fragment KontentAssetFixed_withWebp on KontentAssetFixed {
    base64
    height
    src
    srcSet
    srcWebp
    srcSetWebp
    width
  }
`;

export const KontentAssetFluid_withWebp = graphql`
  fragment KontentAssetFluid_withWebp on KontentAssetFluid {
    aspectRatio
    base64
    sizes
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;

export const KontentAssetFixed_noBase64 = graphql`
  fragment KontentAssetFixed_noBase64 on KontentAssetFixed {
    height
    src
    srcSet
    width
  }
`;

export const KontentAssetFluid_noBase64 = graphql`
  fragment KontentAssetFluid_noBase64 on KontentAssetFluid {
    aspectRatio
    sizes
    src
    srcSet
  }
`;

export const KontentAssetFixed_withWebp_noBase64 = graphql`
  fragment KontentAssetFixed_withWebp_noBase64 on KontentAssetFixed {
    height
    src
    srcSet
    srcWebp
    srcSetWebp
    width
  }
`;

export const KontentAssetFluid_withWebp_noBase64 = graphql`
  fragment KontentAssetFluid_withWebp_noBase64 on KontentAssetFluid {
    aspectRatio
    sizes
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;
