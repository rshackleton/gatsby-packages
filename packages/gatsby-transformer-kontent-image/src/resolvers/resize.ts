import { getAssetUrl, getBase64 } from '../imageUtils';
import {
  KontentAsset,
  KontentAssetResize,
  KontentAssetResizeArgs,
  KontentRichTextImage,
} from '../types';

const DEFAULT_BASE64_WIDTH = 30;

const resizeResolver = {
  type: `KontentAssetResize`,
  args: {
    fit: 'String',
    format: 'String',
    height: 'Int',
    quality: 'Int',
    width: 'Int',
  },
  async resolve(
    source: KontentAsset | KontentRichTextImage,
    args: KontentAssetResizeArgs,
  ): Promise<KontentAssetResize> {
    const base64 = await getBase64(source, DEFAULT_BASE64_WIDTH, 0, args);

    const { height, url, width } = getAssetUrl(
      source,
      args.width,
      args.height || 0,
      args,
    );

    return {
      aspectRatio: width / height,
      base64,
      height,
      src: url,
      width,
    };
  },
};

export default resizeResolver;
