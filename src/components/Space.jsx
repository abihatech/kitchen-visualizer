import bgImg from "../assets/img/bg_img.jpg";
import { useContext } from "react";
import { VisualizerContext } from "../context/VisualizerContext";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Space = ({
  spaces,
  setScreen,
  setCurrentKitchenShapeIndex,
  handlePrevSpace,
  handleNextSpace,
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
           borderRadius: { xs: 3, sm: 6 },
          p: { xs: 2.5, sm: 5, md: 8 },
          color: "white",
          textAlign: "center",
          maxWidth: 1000,
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
          WHAT TYPE OF SPACE ARE YOU DESIGNING?
        </Typography>

        {/* Items always in one horizontal row */}
        <Box
          sx={{
            position: "relative",
            px: { xs: 4, sm: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: { xs: 2, sm: 4, md: 5 },
              mb: 3,
              /* py ensures scale(1.12) doesn't clip top/bottom */
              py: 2,
              overflowX: "auto",
              /* must NOT be overflow:hidden or scale clips */
              overflowY: "visible",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {spaces.map((space, index) => (
              <Box
                key={index}
                onClick={() => {
                  if (space.name === "Kitchen") {
                    // Kitchen: go to shape selection flow
                    setScreen("kitchenShape");
                    setCurrentKitchenShapeIndex(0);
                  } else if (space.subitems?.length) {
                    // Non-kitchen spaces: go directly to visualizer
                    setSelectedMainBackground(space.subitems[0]);
                    setScreen("visualizer");
                  }
                }}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  flexShrink: 0,
                  width: { xs: 80, sm: 120, md: 150 },
                  "&:hover": { transform: "scale(1.12)" },
                }}
              >
                {!space?.subitems && (
                  <Typography
                    variant="body2"
                    sx={{
                      // width: { xs: 80, sm: 120, md: 150 },
                      position: "absolute",
                      top:"30%",
                      transform: "translate(10%,0)",
                      color: "white",
                      fontSize: { xs: "0.7rem", sm: "0.95rem", md: "1.1rem" },
                      fontWeight: 300,
                      fontFamily: "Inter,sans-serif",
                      backgroundColor: "#000",
                      px:1,
                      m:"auto"
                    }}
                  >
                    Coming Soon
                  </Typography>
                )}
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
                    src={space.thumbnail}
                    alt={space.name}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: { xs: 55, sm: 90, md: 120 },
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Paper>
                <Typography
                  component="h3"
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.7rem", sm: "0.95rem", md: "1.1rem" },
                    fontWeight: 500,
                  }}
                >
                  {space.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Prev arrow */}
          <IconButton
            onClick={handlePrevSpace}
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
            onClick={handleNextSpace}
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
            onClick={() => setScreen("welcome")}
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

export default Space;
