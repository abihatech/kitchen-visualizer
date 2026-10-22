export const LOADED_IMAGES = new Set();

/**
 * Preload a single image by creating an Image object.
 * Use this ONLY for the critical currently-visible canvas layer PNGs.
 */
export const preloadImage = (src) => {
  if (!src || LOADED_IMAGES.has(src)) return;
  const img = new Image();
  img.onload = () => {
    LOADED_IMAGES.add(src);
  };
  img.src = src;
};