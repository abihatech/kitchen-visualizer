import { useState, useEffect } from "react";

/**
 * BufferedLayer
 * Keeps the currently loaded layer image visible until the new one is fully loaded,
 * then cross-fades it in. This prevents transparent canvas flashes.
 */
const BufferedLayer = ({ src, alt = "", zIndex = 0, style = {} }) => {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (!src) {
      setLayers([]);
      return;
    }

    // Initialize the first layer
    if (layers.length === 0) {
      setLayers([{ id: src, src, opacity: 1, loaded: true }]);
      return;
    }

    // If the top layer is already this src, ignore
    if (layers[layers.length - 1].src === src) {
      return;
    }

    // Append the new src as loading with 0 opacity
    const newLayerId = `${src}-${Date.now()}`;
    setLayers((prev) => [
      ...prev,
      { id: newLayerId, src, opacity: 0, loaded: false },
    ]);
  }, [src]);

  const handleLoad = (id) => {
    setLayers((prev) => {
      const targetIndex = prev.findIndex((l) => l.id === id);
      if (targetIndex === -1) return prev;

      const updated = [...prev];
      // Set the newly loaded layer to opacity 1
      updated[targetIndex] = {
        ...updated[targetIndex],
        loaded: true,
        opacity: 1,
      };

      // Keep only the newly loaded layer and the one immediately preceding it
      return updated.filter((_, idx) => idx >= targetIndex - 1);
    });

    // Clean up previous layers after the fade-in transition (250ms)
    setTimeout(() => {
      setLayers((prev) => {
        const targetIndex = prev.findIndex((l) => l.id === id);
        if (targetIndex === -1) return prev;
        return prev.filter((_, idx) => idx >= targetIndex);
      });
    }, 250);
  };

  return (
    <>
      {layers.map((layer) => (
        <img
          key={layer.id}
          src={layer.src}
          alt={alt}
          onLoad={() => handleLoad(layer.id)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "inherit",
            zIndex: zIndex,
            opacity: layer.opacity,
            transition: "opacity 0.25s ease-in-out",
            pointerEvents: layer.loaded ? "auto" : "none",
            ...style,
          }}
        />
      ))}
    </>
  );
};

export default BufferedLayer;
