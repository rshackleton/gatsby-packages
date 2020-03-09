# gatsby-transformer-kontent-image

Extends assets from [Kentico Kontent](https://kontent.ai/) to include fields that can be consumed by [`gatsby-image`](https://www.gatsbyjs.org/packages/gatsby-image/).

## Install

```
npm install --save @rshackleton/gatsby-transformer-kontent-image
```

```
yarn add @rshackleton/gatsby-transformer-kontent-image
```

## How to use

Add the plugin to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-transformer-kontent-image`,
      options: {
        // See "Options" below.
      },
    },
  ],
};
```

## Options

There are two main ways to use this plugin; remote or local. The default is remote.

### Remote

The remote option will expose `fixed`, `fluid` and `resize` fields on the `KontentAsset` GraphQL type.

#### Fixed

The following arguments are available:

| Arguments | Type   | Default     | Description                                                                                                           |
| --------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `fit`     | String | `clip`      | The preferred image resize fit mode: [docs](https://docs.kontent.ai/reference/image-transformation#a-resize-fit-mode) |
| `format`  | String | `undefined` | The preferred image format: [docs](https://docs.kontent.ai/reference/image-transformation#a-format)                   |
| `height`  | Int    | `undefined` | The desired image height                                                                                              |
| `quality` | Int    | `undefined` | The preferred image quality: [docs](https://docs.kontent.ai/reference/image-transformation#a-quality-parameter)       |
| `width`   | Int    | `undefined` | The desired image width                                                                                               |

```gql
{
  allKontentItemArticle {
    nodes {
      elements {
        banner {
          value {
            fixed(width: 1000) {
              ...KontentAssetFixed
            }
          }
        }
      }
    }
  }
}
```

```jsx
<GatsbyImage fixed={nodes[0].elements.banner.value[0].fixed} />
```

#### Fluid

The following arguments are available:

| Arguments   | Type   | Default     | Description                                                                                                           |
| ----------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `fit`       | String | `clip`      | The preferred image resize fit mode: [docs](https://docs.kontent.ai/reference/image-transformation#a-resize-fit-mode) |
| `format`    | String | `undefined` | The preferred image format: [docs](https://docs.kontent.ai/reference/image-transformation#a-format)                   |
| `maxHeight` | Int    | `undefined` | The desired maximum image height                                                                                      |
| `maxWidth`  | Int    | `undefined` | The desired maximum image width                                                                                       |
| `quality`   | Int    | `undefined` | The preferred image quality: [docs](https://docs.kontent.ai/reference/image-transformation#a-quality-parameter)       |

```gql
{
  allKontentItemArticle {
    nodes {
      elements {
        banner {
          value {
            fluid(maxWidth: 1000) {
              ...KontentAssetFluid
            }
          }
        }
      }
    }
  }
}
```

```jsx
<GatsbyImage fluid={nodes[0].elements.banner.value[0].fluid} />
```

#### Resize

The following arguments are available:

| Arguments | Type   | Default     | Description                                                                                                           |
| --------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `fit`     | String | `clip`      | The preferred image resize fit mode: [docs](https://docs.kontent.ai/reference/image-transformation#a-resize-fit-mode) |
| `format`  | String | `undefined` | The preferred image format: [docs](https://docs.kontent.ai/reference/image-transformation#a-format)                   |
| `height`  | Int    | `undefined` | The desired image height                                                                                              |
| `quality` | Int    | `undefined` | The preferred image quality: [docs](https://docs.kontent.ai/reference/image-transformation#a-quality-parameter)       |
| `width`   | Int    | `undefined` | The desired image width                                                                                               |

The resize field can be used to just retrieve a single resized image URL - this isn't intended to be used with Gatsby Image.

### Local

The plugin currently supports a single option to create local `File` nodes that can be further transformed by [`gatsby-transformer-sharp`](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/).

```js
module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-transformer-kontent-image`,
      options: {
        local: true,
      },
    },
  ],
};
```

The plugin will include a `localFile` field on the `KontentAsset` GraphQL type. This will be processed by `gatsby-transformer-sharp` and used with the `gatsby-image` component.

```gql
{
  allKontentItemArticle {
    nodes {
      elements {
        banner {
          value {
            localFile {
              childImageSharp {
                fixed(width: 1000) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
}
```

```jsx
<GatsbyImage
  fixed={nodes[0].elements.banner.value[0].localFile.childImageSharp.fixed}
/>
```

The drawback to using `local` mode is the overhead introduced during the build as assets are downloaded from Kontent and processed by Sharp. This can easily add several minutes to builds with large numbers of image variants.

## Fragments

The plugin provides several fragments for use in GraphQL queries:

```gql
fragment KontentAssetFixed on KontentAssetFixed {
  base64
  height
  src
  srcSet
  width
}

fragment KontentAssetFluid on KontentAssetFluid {
  aspectRatio
  base64
  sizes
  src
  srcSet
}

fragment KontentAssetFixed_withWebp on KontentAssetFixed {
  base64
  height
  src
  srcSet
  srcWebp
  srcSetWebp
  width
}

fragment KontentAssetFluid_withWebp on KontentAssetFluid {
  aspectRatio
  base64
  sizes
  src
  srcSet
  srcWebp
  srcSetWebp
}

fragment KontentAssetFixed_noBase64 on KontentAssetFixed {
  height
  src
  srcSet
  width
}

fragment KontentAssetFluid_noBase64 on KontentAssetFluid {
  aspectRatio
  sizes
  src
  srcSet
}

fragment KontentAssetFixed_withWebp_noBase64 on KontentAssetFixed {
  height
  src
  srcSet
  srcWebp
  srcSetWebp
  width
}

fragment KontentAssetFluid_withWebp_noBase64 on KontentAssetFluid {
  aspectRatio
  sizes
  src
  srcSet
  srcWebp
  srcSetWebp
}
```

## License

Licensed under the [MIT License](https://github.com/rshackleton/gatsby-transformer-kontent-image/blob/master/LICENSE.md).

## Contributing

To contribute to this package please fork the repository to make your changes.

This project makes use of [changesets](https://github.com/atlassian/changesets). When making changes please ensure a new changeset is created to define how the package versions should be updated.

Once you are ready open a new PR into this repository with a clear and detailed description of the changes made and which issue(s) are affected.
