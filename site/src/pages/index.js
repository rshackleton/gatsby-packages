import Image from "gatsby-image";
import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
  const homeData = data.allKontentItemHome.nodes[0];

  const images1 = homeData.elements.example1?.value?.map(image => ({
    caption: image.elements.caption?.value,
    fluid: image.elements.asset?.value?.[0]?.fluid,
    key: image.elements.asset?.value?.[0]?.name
  }));

  const images2 = homeData.elements.example2?.value?.map(image => ({
    caption: image.elements.caption?.value,
    fluid: image.elements.asset?.value?.[0]?.fluid,
    key: image.elements.asset?.value?.[0]?.name
  }));

  const images3 = homeData.elements.example3?.images?.map(image => ({
    fluid: image.fluid,
    key: image.image_id
  }));

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(2, 1fr)",
        margin: "auto",
        maxWidth: 1000
      }}
    >
      <h2 style={{ gridColumn: "span 2" }}>Example 1</h2>
      {images1.map(
        img =>
          img.fluid && <Image key={`assets-${img.key}`} fluid={img.fluid} />
      )}
      <h2 style={{ gridColumn: "span 2" }}>Example 2</h2>
      {images2.map(
        img =>
          img.fluid && <Image key={`rt-assets-${img.key}`} fluid={img.fluid} />
      )}
      <h2 style={{ gridColumn: "span 2" }}>Example 3</h2>
      {images3.map(
        img =>
          img.fluid && <Image key={`rt-assets-${img.key}`} fluid={img.fluid} />
      )}
    </div>
  );
};

export const query = graphql`
  query HomePageQuery {
    allKontentItemHome {
      nodes {
        elements {
          example1: image_examples {
            value {
              ... on kontent_item_image {
                elements {
                  asset {
                    value {
                      name
                      fluid(maxWidth: 500) {
                        ...KontentAssetFluid
                      }
                    }
                  }
                }
              }
            }
          }
          example2: image_examples {
            value {
              ... on kontent_item_image {
                elements {
                  asset {
                    value {
                      name
                      fluid(
                        maxWidth: 500
                        srcSetBreakpoints: [
                          100
                          200
                          300
                          400
                          500
                          600
                          700
                          800
                          900
                          1000
                        ]
                      ) {
                        ...KontentAssetFluid
                      }
                    }
                  }
                }
              }
            }
          }
          example3: rich_text_examples {
            images {
              image_id
              fluid(maxWidth: 500) {
                ...KontentAssetFluid
              }
            }
          }
        }
      }
    }
  }
`;
