import { ImageFormatEnum } from '@kentico/kontent-delivery';
import { getAssetUrl, getBase64 } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetFluid,
  KontentAssetFluidArgs,
  KontentRichTextImage,
  ResolverInfo,
} from '../types';

const DEFAULT_BASE64_WIDTH = 30;
const DEFAULT_SIZE_MULTIPLIERS = [0.25, 0.5, 1, 1.5, 2];

const fluidResolver = {
  type: `KontentAssetFluid`,
  args: {
    fit: 'String',
    format: 'String',
    maxWidth: 'Int',
    maxHeight: 'Int',
    quality: 'Int',
    sizes: 'String',
    srcSetBreakpoints: '[Int!]',
  },
  async resolve(
    source: KontentAsset | KontentRichTextImage,
    args: KontentAssetFluidArgs,
    _: unknown,
    info: ResolverInfo,
  ): Promise<KontentAssetFluid> {
    let base64 = '';

    // Get the fields selected in the query.
    const selections = getSelections(info);

    // Only retrieve base64 string if field was requested.
    if (selections.includes('base64')) {
      base64 = await getBase64(source, DEFAULT_BASE64_WIDTH, 0, args);
    }

    let sizes: Array<{ height: number; width: number }> = [];

    if (args.srcSetBreakpoints?.length) {
      // Create combined set to remove duplicate values.
      const set = new Set([...args.srcSetBreakpoints, args.maxWidth]);

      // Convert back to array whilst sorting.
      const combined = Array.from(set).sort((a, b) => a - b);

      sizes = combined.map(targetWidth => {
        const ratio = targetWidth / args.maxWidth;

        return {
          height: (args.maxHeight || 0) * ratio,
          width: targetWidth,
        };
      });
    } else {
      // Or calculate sizes with default multipliers.
      sizes = DEFAULT_SIZE_MULTIPLIERS.map(mul => ({
        height: (args.maxHeight || 0) * mul,
        width: args.maxWidth * mul,
      }));
    }

    const srcs = sizes.map(size => {
      return getSrc(source, size.width, size.height, args);
    });

    const src1x = getSrc(source, args.maxWidth, args.maxHeight || 0, args);
    const srcSet = srcs.map(({ size, src }) => `${src} ${size}w`).join(', ');

    const srcsWebp = sizes.map(size => {
      return getSrc(source, size.width, size.height, {
        ...args,
        format: ImageFormatEnum.Webp,
      });
    });

    const src1xWebp = getSrc(source, args.maxWidth, args.maxHeight || 0, {
      ...args,
      format: ImageFormatEnum.Webp,
    });
    const srcSetWebp = srcsWebp
      .map(({ size, src }) => `${src} ${size}w`)
      .join(', ');

    return {
      aspectRatio: src1x.width / src1x.height,
      base64,
      sizes:
        args.sizes ??
        `(max-width: ${args.maxWidth}px) 100vw, ${args.maxWidth}px`,
      src: src1x.src,
      srcSet: srcSet,
      srcWebp: src1xWebp.src,
      srcSetWebp: srcSetWebp,
    };
  },
};

export default fluidResolver;

/**
 * Generate the Kontent CDN asset url and resulting size.
 * @param source
 * @param maxWidth
 * @param maxHeight
 * @param args
 */
function getSrc(
  source: KontentAsset | KontentRichTextImage,
  maxWidth: number,
  maxHeight: number,
  args: KontentAssetFluidArgs,
): { height: number; size: number; src: string; width: number } {
  const { height, url, width } = getAssetUrl(
    source,
    maxWidth ?? 0,
    maxHeight ?? 0,
    args,
  );

  return { height, size: width, src: url, width };
}

function getSelections(info: ResolverInfo): string[] {
  const fieldNames = info.fieldNodes[0].selectionSet.selections.map(
    sel => sel.name.value,
  );

  return fieldNames;
}
