import { ImageFitModeEnum, ImageUrlBuilder } from '@kentico/kontent-delivery';
import axios from 'axios';
import { KontentAsset, KontentAssetArgs, KontentRichTextImage } from './types';

/**
 * Calculate adjusted image size
 * @param args The adjusted size arguments
 */
function calculateAdjustedSize(args: {
  fit: ImageFitModeEnum;
  originalHeight: number;
  originalWidth: number;
  targetHeight: number;
  targetWidth: number;
}): { width: number; height: number } {
  const {
    fit,
    originalHeight,
    originalWidth,
    targetHeight,
    targetWidth,
  } = args;

  let width = 0;
  let height = 0;

  // Get adjusted width.
  if (targetWidth > originalWidth) {
    const scaleRatio = originalWidth / targetWidth;
    width = scaleRatio * targetWidth;
  } else {
    width = targetWidth;
  }

  // Get adjusted height.
  if (fit === ImageFitModeEnum.Clip || !targetHeight) {
    const aspectRatio = originalWidth / originalHeight;
    height = width / aspectRatio;
  } else if (targetHeight > originalHeight) {
    const scaleRatio = originalHeight / targetHeight;
    height = scaleRatio * targetHeight;
    width = scaleRatio * width;
  } else {
    height = targetHeight;
  }

  width = Math.round(width);
  height = Math.round(height);

  return { height, width };
}

/**
 * Create an instance of ImageUrlBuilder for the provided arguments.
 * @param url The base Kontent asset URL
 * @param args The GraphQL resolver arguments
 */
function createUrlBuilder(
  url: string,
  args: KontentAssetArgs,
): ImageUrlBuilder {
  let builder = new ImageUrlBuilder(url);

  if (args.fit) {
    builder = builder.withFitMode(args.fit);
  }

  if (args.format) {
    builder = builder.withFormat(args.format);
  }

  if (args.quality) {
    builder = builder.withQuality(args.quality);
  }

  return builder;
}

/**
 * Get the asset URL for the provided arguments.
 * @param url The base Kontent asset URL
 * @param args The GraphQL resolver arguments
 */
function getAssetUrl(
  source: KontentAsset | KontentRichTextImage,
  targetWidth: number,
  targetHeight: number,
  args: KontentAssetArgs,
): {
  height: number;
  url: string;
  width: number;
} {
  const { height, width } = calculateAdjustedSize({
    fit: args.fit,
    originalHeight: source.height,
    originalWidth: source.width,
    targetHeight,
    targetWidth,
  });

  const builder = createUrlBuilder(source.url, args)
    .withWidth(width)
    .withHeight(height);

  return { height, url: builder.getUrl(), width };
}

/**
 * Get the base64 encoded data URI for the provided arguments.
 * @param url The base Kontent asset URL
 * @param args The GraphQL resolver arguments
 */
async function getBase64(
  source: KontentAsset | KontentRichTextImage,
  targetWidth: number,
  targetHeight: number,
  args: KontentAssetArgs,
): Promise<string> {
  const sourceUrl = source?.url;

  // If no source has been provided then return early to avoid timeouts.
  if (!sourceUrl || !sourceUrl.length) {
    if (process.env.GATSBY_TRANSFORMER_KONTENT_DEBUG) {
      console.log(`BASE64: Ignored asset due to missing source value`);
    }

    return '';
  }

  const { height, width } = calculateAdjustedSize({
    fit: args.fit,
    originalHeight: source.height,
    originalWidth: source.width,
    targetHeight,
    targetWidth,
  });

  const builder = createUrlBuilder(source.url, args)
    .withWidth(width)
    .withHeight(height);

  const url = builder.getUrl();

  // @todo: Add caching for base64 images.
  const result = await axios.get(url, { responseType: 'arraybuffer' });

  if (process.env.GATSBY_TRANSFORMER_KONTENT_DEBUG) {
    console.log(
      `BASE64:\n  STATUS: ${result.status} ${result.statusText}\n  URL: ${sourceUrl}`,
    );
  }

  const data = Buffer.from(result.data).toString('base64');

  return `data:image/jpeg;base64,${data}`;
}

export { calculateAdjustedSize, createUrlBuilder, getAssetUrl, getBase64 };
