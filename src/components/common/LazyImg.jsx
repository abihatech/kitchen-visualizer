import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const FALLBACK = "https://placehold.co/150x150/2a2a2a/666666?text=NA";

import { LOADED_IMAGES } from "../../utils/imageUtils";

/**
 * LazyImg
 * Intersection-Observer–based lazy image.
 * - Shows a shimmer skeleton until in viewport
 * - Fades in on load
 * - Falls back gracefully on error
 */
const LazyImg = ({
  src,
  alt = "",
  width,
  height,
  sx = {},
  onError,
  ...rest
}) => {
  const ref = useRef(null);
  
  // Use global cache to instantly show already preloaded/loaded images without flickering
  const isCached = src ? LOADED_IMAGES.has(src) : false;
  const [inView, setInView] = useState(isCached);
  const [loaded, setLoaded] = useState(isCached);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    if (LOADED_IMAGES.has(src)) {
      setInView(true);
      setLoaded(true);
      setHasError(false);
      return;
    }

    // Reset loading states when src changes to show skeleton again
    setInView(false);
    setLoaded(false);
    setHasError(false);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "200px" } // Start loading 200px before it enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    if (src) {
      LOADED_IMAGES.add(src);
    }
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius: "4px",
        // Skeleton shimmer shown until image loads
        backgroundColor: loaded ? "transparent" : "rgba(80, 80, 80, 0.3)",
        "&::after": !loaded
          ? {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)",
              animation: "shimmer 1.4s infinite",
            }
          : {},
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      {inView && (
        <Box
          component="img"
          src={hasError ? FALLBACK : src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.25s ease-in-out",
            ...sx,
          }}
          {...rest}
        />
      )}
    </Box>
  );
};

export default LazyImg;
