require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-theme-kontent`,
      options: {
        kontent: {
          deliveryClientConfig: {
            projectId: process.env.KC_PROJECT_ID,
            typeResolvers: [],
            previewApiKey: process.env.KC_PREVIEW_KEY,
            globalQueryConfig: {
              usePreviewMode: !!process.env.KC_PREVIEW_KEY
            }
          },
          languageCodenames: [`default`]
        }
      }
    }
  ]
};
