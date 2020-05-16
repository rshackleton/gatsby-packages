require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-theme-kontent`,
      options: {
        kontent: {
          authorizationKey: process.env.KC_PREVIEW_KEY,
          languageCodenames: [`default`],
          projectId: process.env.KC_PROJECT_ID,
          usePreviewUrl: !!process.env.KC_PREVIEW_KEY
        }
      }
    }
  ]
};
