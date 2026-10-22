import { useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { VisualizerContext } from "../../context/VisualizerContext";

const getLayerZIndex = (layer, backgroundId) => {
  if (layer?.cabinet_type_name === "Handle") return 1;

  const topCategories = [
    "Wall Cabinets",
    "Crown Moldings",
    [130, 631, 641].includes(backgroundId) && "Backsplash",
  ].filter(Boolean);
  return topCategories.includes(layer?.cabinet_type_name) ? 1 : 0;
};

const DesignPreview = ({ maxHeight = 260 }) => {
  const { selectedMainBackground, appliedLayers } =
    useContext(VisualizerContext);

  const layers = useMemo(() => {
    const entries = Object.entries(appliedLayers || {})
      .filter(([, layer]) => layer?.png_layer_url)
      .map(([category, layer]) => ({
        category,
        layer,
        zIndex: getLayerZIndex(layer, selectedMainBackground?.id),
      }));

    return entries.sort((a, b) => a.zIndex - b.zIndex);
  }, [appliedLayers, selectedMainBackground?.id]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxHeight,
        aspectRatio: "16 / 9",
        bgcolor: "#111",
        border: "1px solid #333",
        overflow: "hidden",
      }}
    >
      {selectedMainBackground?.thumbnail && (
        <Box
          component="img"
          src={selectedMainBackground.thumbnail}
          alt="Design preview"
          loading="eager"
          decoding="async"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}

      {layers.map(({ category, layer }) => (
        <Box
          key={`${category}-${layer?.id || layer?.png_layer_url}`}
          component="img"
          src={layer?.png_layer_url}
          alt=""
          loading="eager"
          decoding="async"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      ))}
    </Box>
  );
};

export default DesignPreview;
