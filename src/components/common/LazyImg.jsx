import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const FALLBACK = "https://placehold.co/150x150/2a2a2a/666666?text=NA";

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
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImgSrc(src);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "150px" } // start loading 150px before it enters view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => setLoaded(true);

  const handleError = (e) => {
    setHasError(true);
    setImgSrc(FALLBACK);
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
        backgroundColor: loaded ? "transparent" : "rgba(80,80,80,0.5)",
        "&::after": !loaded
          ? {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
              animation: "shimmer 1.4s infinite",
            }
          : {},
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      <Box
        component="img"
        ref={null}
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "4px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          ...sx,
        }}
        {...rest}
      />
    </Box>
  );
};

export default LazyImg;
