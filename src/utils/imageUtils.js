/**
 * Shared image preloading cache and utilities.
 * Module-level Set persists across re-renders and screen navigations.
 */

export const imageCache = new Set();

/**
 * Preload a single image URL in the background.
 * No-ops if the URL is already cached or empty.
 */
export const preloadImage = (src) => {
  if (!src || imageCache.has(src)) return;
  imageCache.add(src);
  const img = new Image();
  img.src = src;
};

/**
 * Preload an array of image URLs in the background.
 */
export const preloadImages = (urls) => {
  if (!Array.isArray(urls)) return;
  urls.forEach(preloadImage);
};

/**
 * Tiered preload strategy for a space's layer data:
 *   Phase 1 (immediate) — PNG layers of the default selected items (visible on canvas)
 *   Phase 2 (300 ms)   — texture_url thumbnails for all items (small JPGs for popup grid)
 *   Phase 3 (idle)     — remaining PNG layers via requestIdleCallback
 *
 * @param {Array}  layerData    — full layerdata array from a space JSON
 * @param {Object} appliedMap  — { [categoryName]: selectedItem } from initial selection
 */
export const tieredPreload = (layerData, appliedMap = {}) => {
  // Phase 1: Critical — only the PNGs actually rendered right now
  const criticalUrls = Object.values(appliedMap)
    .flatMap((item) => [item?.png_layer_url].filter(Boolean));
  preloadImages(criticalUrls);

  // Phase 2: Popup thumbnails (texture_url) — small files, fast to load
  setTimeout(() => {
    const textureUrls = layerData
      .map((item) => item.texture_url)
      .filter(Boolean);
    preloadImages(textureUrls);
  }, 300);

  // Phase 3: All remaining PNG layers in idle time
  const allPngUrls = layerData
    .map((item) => item.png_layer_url)
    .filter((url) => url && !imageCache.has(url));

  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(
      () => preloadImages(allPngUrls),
      { timeout: 3000 }
    );
  } else {
    // Safari fallback
    setTimeout(() => preloadImages(allPngUrls), 2000);
  }
};
