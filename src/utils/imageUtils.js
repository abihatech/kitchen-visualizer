/**
 * Preload a single image by creating an Image object.
 * Use this ONLY for the critical currently-visible canvas layer PNGs.
 */
export const preloadImage = (src) => {
  if (!src) return;
  const img = new Image();
  img.src = src;
};