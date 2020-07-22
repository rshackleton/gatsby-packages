---
"@rshackleton/gatsby-transformer-kontent-image": patch
"@rshackleton/site": patch
---

Fix #152 #153 #154

- Add support for the `srcSetBreakpoints` parameter to allow different image sizes to be requested.
- Add support for the `sizes` parameter to allow the `sizes` attribute to be overridden.
- Amend fixed and fluid resolvers to only retrieve base64 image when included in query.
