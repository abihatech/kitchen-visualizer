import bgImg from "../assets/img/bg_img.jpg";
import { useContext } from "react";
import { VisualizerContext } from "../context/VisualizerContext";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AvailableItems = ({
  availableItems,
  handleNextKitchenShape,
  handlePrevKitchenShape,
  setScreen,
}) => {
  const { setSelectedMainBackground } = useContext(VisualizerContext);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        p: { xs: 1.5, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,0.70)",
          p: { xs: 2.5, sm: 5, md: 8 },
          borderRadius: { xs: 3, sm: 6 },
          color: "white",
          textAlign: "center",
          maxWidth: 900,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 300,
            mb: { xs: 3, sm: 5 },
            fontSize: { xs: "0.9rem", sm: "1.3rem", md: "1.8rem" },
            letterSpacing: 1,
          }}
        >
          SELECT PREFERRED KITCHEN DESIGN?
        </Typography>

        {/* Always single horizontal row */}
        <Box sx={{ position: "relative", px: { xs: 4, sm: 6 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: { xs: 2, sm: 3, md: 5 },
              mb: 3,
              py: 2,
              overflowX: "auto",
              overflowY: "visible",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {availableItems.map((item, index) => (
              <Box
                key={index}
                onClick={() => {
                  setSelectedMainBackground(item);
                  setScreen("visualizer");
                }}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  flexShrink: 0,
                  width: { xs: 80, sm: 150, md: 200 },
                  "&:hover": { transform: "scale(1.12)" },
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 0.5, sm: 1 },
                    mb: { xs: 0.5, sm: 1 },
                    bgcolor: "white",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={item.thumbnailsm}
                    alt={item.name}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: { xs: 55, sm: 90, md: 128 },
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Paper>
                <Typography
                  component="h3"
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1.1rem" },
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Prev arrow */}
          <IconButton
            onClick={handleNextKitchenShape}
            sx={{
              position: "absolute",
              left: { xs: -6, sm: -12 },
              top: "40%",
              transform: "translateY(-50%)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              p: { xs: 0.25, sm: 0.75 },
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ fontSize: { xs: 18, sm: 28, md: 36 } }}
            />
          </IconButton>

          {/* Next arrow */}
          <IconButton
            onClick={handlePrevKitchenShape}
            sx={{
              position: "absolute",
              right: { xs: -6, sm: -12 },
              top: "40%",
              transform: "translateY(-50%)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              p: { xs: 0.25, sm: 0.75 },
            }}
          >
            <ArrowForwardIosIcon
              sx={{ fontSize: { xs: 18, sm: 28, md: 36 } }}
            />
          </IconButton>
        </Box>

        {/* Back button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <IconButton
            onClick={() => setScreen("kitchenShape")}
            sx={{
              border: "2px solid white",
              color: "white",
              borderRadius: "50%",
              p: { xs: 0.4, sm: 0.75, md: 1 },
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 22, md: 28 } }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableItems;
