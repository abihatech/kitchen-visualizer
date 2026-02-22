import bgImg from "../assets/img/bg_img.jpg";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Shape = ({
  shapes,
  handleNextKitchenShape,
  handlePrevKitchenShape,
  setScreen,
  setSelectedKitchenShapeId,
}) => {
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
          WHAT IS YOUR INTENDED KITCHEN SHAPE?
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
            {shapes.map((shape, index) => (
              <Box
                key={index}
                onClick={() => {
                  if (!shape?.subitems?.length) return;
                  setSelectedKitchenShapeId(shape.id);
                  setScreen("availableItems");
                }}
                sx={{
                  cursor: shape?.subitems?.length ? "pointer" : "default",
                  transition: "transform 0.3s ease",
                  flexShrink: 0,
                  width: { xs: 80, sm: 130, md: 170 },
                  opacity: shape?.subitems?.length ? 1 : 0.5,
                  "&:hover": {
                    transform: shape?.subitems?.length ? "scale(1.12)" : "none",
                  },
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
                    src={shape.thumbnail}
                    alt={shape.name}
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
                  {shape.name}
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
            onClick={() => setScreen("spaceType")}
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

export default Shape;
