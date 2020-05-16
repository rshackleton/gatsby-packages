module.exports = options => ({
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: options.kontent || {},
    },
    {
      resolve: `@rshackleton/gatsby-transformer-kontent-image`,
      options: options.kontentImage || {},
    },
  ],
});
