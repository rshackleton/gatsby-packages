# `gatsby-theme-kontent`

## Quick Start

```sh
npm install @rshackleton/gatsby-theme-kontent
```

```sh
yarn add @rshackleton/gatsby-theme-kontent
```

Add the theme to your `gatsby-config.js`.

```js
module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-theme-kontent`,
      options: {
        kontent: {
          // @kentico/gatsby-source-kontent options
        },
        kontentImage: {
          // @rshackleton/gatsby-transformer-kontent-image options
        },
      },
    },
  ],
};
```

## What does it do?

The `gatsby-theme-kontent` theme includes two key plugins for developing a Gatsby website with [Kentico Kontent](https://kontent.ai/).

Firstly, the official `@kentico/gatsby-source-kontent` plugin is included. The theme accepts the same options as the source plugin under the `kontent` configuration key.

Secondly, the `@rshackleton/gatsby-transformer-kontent-image` plugin is included. This adds support for [Gatsby Image](https://www.gatsbyjs.org/packages/gatsby-image/) to the `KontentAsset` GraphQL type.

## Contributing

To contribute to this package please fork the repository to make your changes.

This project makes use of [changesets](https://github.com/atlassian/changesets). When making changes please ensure a new changeset is created to define how the package versions should be updated.

Once you are ready open a new PR into this repository with a clear and detailed description of the changes made and which issue(s) are affected.
