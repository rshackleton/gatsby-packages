import { CustomPluginOptions } from './types';

const DEFAULT_OPTIONS: CustomPluginOptions = {
  local: false,
  plugins: [],
};

/**
 * Combine plugin options with default options.
 * @param options The combined options.
 */
function resolveOptions(options: CustomPluginOptions): CustomPluginOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}

export { resolveOptions };
