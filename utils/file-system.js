import path from 'path';

/**
 *
 * @param {string} url
 * ```
 * getAbsolutePath(import.meta.url)
 *
 */
export const getAbsolutePath = (url) => path.dirname(new URL(url).pathname);
