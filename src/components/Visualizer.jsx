import { VisualizerContext } from "../context/VisualizerContext";
import { useContext } from "react";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import SelectedItemPopup from "./common/SelectedItemPopup";
import ImageSetter from "./common/ImageSetter";
import CategoryPopup from "./common/CategoryPopup";

const Visualizer = () => {
  const {
    showCategoryPopup,
    showSelectedItemPopup,
    activeCategory,
    appliedLayers,
    showFullCategory,
    closePopups,
  } = useContext(VisualizerContext);

  const theme = useTheme();
  const isPortraitMobile = useMediaQuery(
    "(max-width: 768px) and (orientation: portrait)",
  );

  const anyPopupOpen = showSelectedItemPopup || showCategoryPopup;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Portrait-mode rotation overlay */}
      {isPortraitMobile && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            bgcolor: "rgba(10, 15, 40, 0.96)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backdropFilter: "blur(4px)",
          }}
        >
          <ScreenRotationIcon
            sx={{
              fontSize: 64,
              color: "#00ccff",
              animation: "rotateHint 2s ease-in-out infinite",
            }}
          />
          <Typography
            sx={{
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 600,
              textAlign: "center",
              px: 3,
            }}
          >
            Please rotate your phone
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.85rem",
              textAlign: "center",
              px: 4,
            }}
          >
            For the best experience, use your device in landscape mode
          </Typography>
          <style>{`
            @keyframes rotateHint {
              0%   { transform: rotate(0deg); }
              30%  { transform: rotate(90deg); }
              60%  { transform: rotate(90deg); }
              100% { transform: rotate(0deg); }
            }
          `}</style>
        </Box>
      )}

      <Header />

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Sidebar />

        {/* Visualizer Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#333",
            position: "relative",
          }}
        >
          <ImageSetter />

          {/* Transparent backdrop — closes popups on outside click/tap, does NOT intercept clicks inside popups */}
          {anyPopupOpen && (
            <Box
              onClick={() => closePopups()}
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 1199,
                /* transparent — just catches outside clicks */
              }}
            />
          )}

          {/* Popup container — sits above backdrop, stopPropagation prevents backdrop from firing */}
          {anyPopupOpen && (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1200,
                p: { xs: 0.5, sm: 1 },
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: { xs: 0.5, sm: 1 },
                maxWidth: "100%",
                pointerEvents: "auto",
              }}
            >
              {showSelectedItemPopup && (
                <SelectedItemPopup
                  category={activeCategory}
                  item={appliedLayers[activeCategory]}
                  onSelectStyle={showFullCategory}
                />
              )}

              {showCategoryPopup && activeCategory && <CategoryPopup />}
            </Box>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Visualizer;
