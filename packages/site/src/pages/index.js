import Image from "gatsby-image";
import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
  return (
    <div style={{ margin: "0 auto", maxWidth: "500px" }}>
      <Image
        fluid={
          data.allKontentItemHomePage.nodes[0].elements.background_image
            .value[0].fluid
        }
      />
    </div>
  );
};

export const query = graphql`
  query HomePageQuery {
    allKontentItemHomePage {
      nodes {
        elements {
          background_image {
            value {
              fluid(maxWidth: 500) {
                aspectRatio
                base64
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
              }
            }
          }
        }
      }
    }
  }
`;
