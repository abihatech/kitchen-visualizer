import {
  Box,
  IconButton,
  Slider,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isPreviewMode) return null;

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 1, sm: 3, md: 4 },
        py: 0.5,
        bgcolor: "black",
        color: "white",
        zIndex: 1201,
        flexWrap: "wrap",
        gap: 0.5,
        minHeight: 48,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.25, sm: 1 },
          flexWrap: "nowrap",
        }}
      >
        {/* Zoom Slider — hidden on xs */}
        {!isMobile && (
          <Slider
            value={scale}
            onChange={(e, val) => handleZoom(val)}
            min={0.5}
            max={3}
            step={0.1}
            sx={{ width: { sm: 100, md: 150 }, color: "white" }}
          />
        )}
        <Tooltip title="Zoom In">
          <IconButton
            color="inherit"
            onClick={handleZoomIn}
            size={isMobile ? "small" : "medium"}
          >
            <ZoomInIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton
            color="inherit"
            onClick={handleZoomOut}
            size={isMobile ? "small" : "medium"}
          >
            <ZoomOutIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Pan Tool">
          <IconButton
            color={activeTool === "pan" ? "primary" : "inherit"}
            onClick={() =>
              setActiveTool((p) => (p === "pan" ? "default" : "pan"))
            }
            size={isMobile ? "small" : "medium"}
          >
            <PanToolIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset View">
          <IconButton
            color="inherit"
            onClick={handleResetZoom}
            size={isMobile ? "small" : "medium"}
          >
            <MyLocationIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fullscreen">
          <IconButton
            color="inherit"
            onClick={toggleFullScreen}
            size={isMobile ? "small" : "medium"}
          >
            <FullscreenIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
      </Box>

      {!isMobile && (
        <Typography variant="body2" sx={{ fontSize: "0.75rem", opacity: 0.8 }}>
          Powered by Peak Design Studio
        </Typography>
      )}
    </Box>
  );
};

export default Footer;
