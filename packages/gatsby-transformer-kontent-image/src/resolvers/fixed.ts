import { ImageFormatEnum } from '@kentico/kontent-delivery';
import { getAssetUrl, getBase64 } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetFixed,
  KontentAssetFixedArgs,
  KontentRichTextImage,
} from '../types';

const DEFAULT_BASE64_WIDTH = 30;
const DEFAULT_SIZES = [1, 1.5, 2];

const fixedResolver = {
  type: `KontentAssetFixed`,
  args: {
    fit: 'String',
    format: 'String',
    height: 'Int',
    quality: 'Int',
    width: 'Int',
  },
  async resolve(
    source: KontentAsset | KontentRichTextImage,
    args: KontentAssetFixedArgs,
  ): Promise<KontentAssetFixed> {
    const base64 = await getBase64(source, DEFAULT_BASE64_WIDTH, 0, args);

    const srcs = DEFAULT_SIZES.map(size => {
      const { height, url, width } = getAssetUrl(
        source,
        args.width * size,
        (args.height || 0) * size,
        args,
      );

      return { height, size, src: url, width };
    });

    const src1x = srcs[0];
    const srcSet = srcs.map(({ size, src }) => `${src} ${size}x`).join(', ');

    const srcsWebp = DEFAULT_SIZES.map(size => {
      const { height, url, width } = getAssetUrl(
        source,
        args.width * size,
        (args.height || 0) * size,
        { ...args, format: ImageFormatEnum.Webp },
      );

      return { height, size, src: url, width };
    });

    const src1xWebp = srcsWebp[0];
    const srcSetWebp = srcsWebp
      .map(({ size, src }) => `${src} ${size}x`)
      .join(', ');

    return {
      aspectRatio: src1x.width / src1x.height,
      base64,
      height: src1x.height,
      src: src1x.src,
      srcSet: srcSet,
      srcWebp: src1xWebp.src,
      srcSetWebp: srcSetWebp,
      width: src1x.width,
    };
  },
};

export default fixedResolver;
