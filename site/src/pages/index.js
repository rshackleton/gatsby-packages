import Image from "gatsby-image";
import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
  const homeData = data.allKontentItemHome.nodes[0];

  const images = homeData.elements.image_examples?.value?.map(image => ({
    caption: image.elements.caption?.value,
    fluid: image.elements.asset?.value?.[0]?.fluid,
    key: image.elements.asset?.value?.[0]?.name
  }));

  const images2 = homeData.elements.rich_text_examples?.images?.map(image => ({
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
      {images.map(
        img =>
          img.fluid && <Image key={`assets-${img.key}`} fluid={img.fluid} />
      )}
      {images2.map(
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
          image_examples {
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
          rich_text_examples {
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
