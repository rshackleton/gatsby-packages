import Image from "gatsby-image";
import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
  const homeData = data.allKontentItemHome.nodes[0];

  const images = homeData.elements.image_examples?.linked_items?.map(image => ({
    caption: image.elements.caption?.value,
    fluid: image.elements.asset?.value?.[0]?.fluid
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
      {images.map(img => img.fluid && <Image fluid={img.fluid} />)}
    </div>
  );
};

export const query = graphql`
  query HomePageQuery {
    allKontentItemHome {
      nodes {
        elements {
          image_examples {
            linked_items {
              ... on kontent_item_image {
                elements {
                  asset {
                    value {
                      fluid(maxWidth: 500) {
                        ...KontentAssetFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
