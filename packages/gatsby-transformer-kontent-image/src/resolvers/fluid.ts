import { ImageFormatEnum } from '@kentico/kontent-delivery';
import { getAssetUrl, getBase64 } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetFluid,
  KontentAssetFluidArgs,
  KontentRichTextImage,
} from '../types';

const DEFAULT_BASE64_WIDTH = 30;
const DEFAULT_SIZES = [0.25, 0.5, 1, 1.5, 2];

const fluidResolver = {
  type: `KontentAssetFluid`,
  args: {
    fit: 'String',
    format: 'String',
    maxWidth: 'Int',
    maxHeight: 'Int',
    quality: 'Int',
    srcSetBreakpoints: '[Int!]',
  },
  async resolve(
    source: KontentAsset | KontentRichTextImage,
    args: KontentAssetFluidArgs,
  ): Promise<KontentAssetFluid> {
    const base64 = await getBase64(source, DEFAULT_BASE64_WIDTH, 0, args);

    const srcs = DEFAULT_SIZES.map(size => {
      const { height, url, width } = getAssetUrl(
        source,
        args.maxWidth * size,
        (args.maxHeight || 0) * size,
        args,
      );

      return { height, size: args.maxWidth * size, src: url, width };
    });

    // @todo: Make sure this gets the 1x size.
    const src1x = srcs[2];
    const srcSet = srcs.map(({ size, src }) => `${src} ${size}w`).join(', ');

    const srcsWebp = DEFAULT_SIZES.map(size => {
      const { height, url, width } = getAssetUrl(
        source,
        args.maxWidth * size,
        (args.maxHeight || 0) * size,
        { ...args, format: ImageFormatEnum.Webp },
      );

      return { height, size: args.maxWidth * size, src: url, width };
    });

    // @todo: Make sure this gets the 1x size.
    const src1xWebp = srcsWebp[2];
    const srcSetWebp = srcsWebp
      .map(({ size, src }) => `${src} ${size}w`)
      .join(', ');

    return {
      aspectRatio: src1x.width / src1x.height,
      base64,
      sizes: `(max-width: ${args.maxWidth}px) 100vw, ${args.maxWidth}px`,
      src: src1x.src,
      srcSet: srcSet,
      srcWebp: src1xWebp.src,
      srcSetWebp: srcSetWebp,
    };
  },
};

export default fluidResolver;
