import { VisualizerContext } from "../../context/VisualizerContext";
import { useContext } from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Icon } from "@iconify/react";
import { CATEGORIES } from "../../utils/constants/constant";

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
        <img
          src={selectedMainBackground?.thumbnail}
          alt="Room Background"
          style={{ width: "100%", height: "100%", objectFit: "inherit" }}
        />
        {Object.values(appliedLayers).map(
          (layer) =>
            layer?.png_layer_url && (
              <img
                key={layer.png_layer_url}
                src={layer.png_layer_url}
                alt=""
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "inherit",
                  zIndex: ["Wall Cabinets", "Crown Moldings"]?.includes(
                    layer.cabinet_type_name
                  )
                    ? 1
                    : 0,
                }}
              />
            )
        )}
        {!isPreviewMode &&
          selectedMainBackground?.hotpots?.map((hotspot, index) => (
            <IconButton
              key={index}
              onClick={() => openPopup(hotspot.category, "hotspot")}
              sx={{
                position: "absolute",
                top: hotspot.top,
                left: hotspot.left,
                bgcolor: "rgba(0,0,0,0.6)",
                border: "1px solid white",
                color: "white",
                transform: `scale(${1 / scale})`,
                transformOrigin: "center center",
                padding: 1.3,
                zIndex: 2,
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              <div>
                <Icon
                  icon="gridicons:add"
                  height={12}
                  style={{ position: "absolute", top: 5, right: 6,padding:0.5 }}
                />
                <Icon
                  icon={
                    CATEGORIES[hotspot.category.toUpperCase().replace(" ", "_")]
                      ?.icon || "ix:tiles-filled"
                  }
                  height={16}
                />
              </div>
            </IconButton>
          ))}
      </Box>
    </Box>
  );
};

export default ImageSetter;
