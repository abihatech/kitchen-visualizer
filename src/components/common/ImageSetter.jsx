import { VisualizerContext } from "../../context/VisualizerContext";
import { useContext } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import { CATEGORIES } from "../../utils/constants/constant";
import BufferedLayer from "./BufferedLayer";
import { preloadImage } from "../../utils/imageUtils";

const getLayerZIndex = (layer, backgroundId) => {
  if (layer?.cabinet_type_name === "Handle") return 1;

  const topCategories = [
    "Wall Cabinets",
    "Crown Moldings",
    [130, 631, 641].includes(backgroundId) && "Backsplash",
  ].filter(Boolean);

  return topCategories.includes(layer?.cabinet_type_name) ? 1 : 0;
};

const ImageSetter = () => {
  const {
    selectedMainBackground,
    appliedLayers,
    scale,
    panOffset,
    isPanning,
    visualizerRef,
    activeTool,
    isPreviewMode,
    openPopup,
    handleMouseDown,
    organizedLayerData,
  } = useContext(VisualizerContext);

  return (
    <Box
      component="main"
      ref={visualizerRef}
      onMouseDown={handleMouseDown}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        cursor: isPanning
          ? "grabbing"
          : activeTool === "pan" && !isPreviewMode
            ? "grab"
            : "default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* Background image */}
        {selectedMainBackground?.thumbnail && (
          <BufferedLayer
            src={selectedMainBackground.thumbnail}
            alt="Room Background"
            zIndex={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "inherit",
            }}
          />
        )}

        {/* Applied layer images */}
        {Object.values(appliedLayers).map(
          (layer) =>
            layer?.png_layer_url && (
              <BufferedLayer
                key={layer.png_layer_url}
                src={layer.png_layer_url}
                alt=""
                zIndex={getLayerZIndex(layer, selectedMainBackground?.id)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "inherit",
                }}
              />
            ),
        )}

        {/* Hotspot buttons */}
        {!isPreviewMode &&
          selectedMainBackground?.hotpots?.map((hotspot, index) => (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "rgba(0,0,0,0.85)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px",
                  },
                },
                arrow: { sx: { color: "rgba(0,0,0,0.85)" } },
              }}
              key={index}
              title={hotspot.category}
              placement="top"
              arrow
            >
              {/* 
                Wrap in a plain div that handles the scale transform.
                The IconButton itself stays unscaled so it stays perfectly circular.
              */}
              <Box
                sx={{
                  position: "absolute",
                  top: hotspot.top,
                  left: hotspot.left,
                  transform: `scale(${1 / scale})`,
                  transformOrigin: "center center",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => openPopup(hotspot.category, "hotspot")}
                  onMouseEnter={() => {
                    const items = organizedLayerData[hotspot.category] || [];
                    // Preload first 15 thumbnails so they show up instantly when category is clicked
                    items.slice(0, 15).forEach((item) => {
                      const imgSrc = item.texture_url || item.png_layer_url;
                      if (imgSrc) {
                        preloadImage(imgSrc);
                      }
                    });
                  }}
                  sx={{
                    bgcolor: "rgba(0,0,0,0.65)",
                    border: "2px solid rgba(255,255,255,0.85)",
                    color: "white",
                    /* Fixed square size so border-radius:50% always gives a circle */
                    width: 42,
                    height: 42,
                    padding: 0,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
                    transition: "background-color 0.2s",
                  }}
                >
                  {/* Plus badge top-right */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      width: 12,
                      height: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon icon="ph:plus-fill" width={10} height={10} />
                  </Box>
                  {/* Category icon centered */}
                  <Icon
                    icon={
                      CATEGORIES[
                        hotspot.category.toUpperCase().replace(" ", "_")
                      ]?.icon || "ix:tiles-filled"
                    }
                    width={18}
                    height={18}
                  />
                </IconButton>
              </Box>
            </Tooltip>
          ))}
      </Box>
    </Box>
  );
};

export default ImageSetter;
