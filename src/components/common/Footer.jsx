import { Box, IconButton, Slider, Typography } from "@mui/material";
import  { useContext } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import PanToolIcon from "@mui/icons-material/PanTool";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { VisualizerContext } from "./../../context/VisualizerContext";

const Footer = () => {
  const {
    scale,
    activeTool,
    setActiveTool,
    isPreviewMode,
    handleZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    toggleFullScreen,
  } = useContext(VisualizerContext);

  if (isPreviewMode) return null;

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        bgcolor: "black",
        color: "white",
        zIndex: 1201,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Slider
          value={scale}
          onChange={(e, val) => handleZoom(val)}
          min={0.5}
          max={3}
          step={0.1}
          sx={{ width: 150 }}
        />
        <IconButton color="inherit" onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
        <IconButton
          color={activeTool === "pan" ? "primary" : "inherit"}
          onClick={() =>
            setActiveTool((p) => (p === "pan" ? "default" : "pan"))
          }
        >
          <PanToolIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleResetZoom}>
          <MyLocationIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleFullScreen}>
          <FullscreenIcon />
        </IconButton>
      </Box>
      <Typography variant="body2">Powered by Paramount</Typography>
    </Box>
  );
};

export default Footer;
