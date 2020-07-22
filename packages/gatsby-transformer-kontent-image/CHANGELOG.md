# @rshackleton/gatsby-transformer-kontent-image

## 2.1.0

### Minor Changes

- ce7cc52: Fix #152 #153 #154

  - Add support for the `srcSetBreakpoints` parameter to allow different image sizes to be requested.
  - Add support for the `sizes` parameter to allow the `sizes` attribute to be overridden.
  - Amend fixed and fluid resolvers to only retrieve base64 image when included in query.

## 2.0.0

### Major Changes

- 5f411d2: Update resolvers to target fixed type name `kontent_item_rich_text_element_image`.

## 1.0.0

### Major Changes

- 9e80c83: - Update to handle new type names in @kentico/gatsby-source-kontent@6.0.0

## 0.1.0

### Patch Changes

- 10314b8: #90 - Update log messages and include check to avoid timeout errors
