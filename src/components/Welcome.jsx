import bgImg from "../assets/img/bg_img.jpg";
import logo from "../assets/img/logo.png";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Welcome = ({ setScreen }) => {
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
        p: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(200, 210, 225, 0.65)",
          borderRadius: { xs: 3, sm: 6 },
          px: { xs: 2.5, sm: 5, md: 8 },
          py: { xs: 2, sm: 4, md: 5 },
          textAlign: "center",
          maxWidth: 640,
          width: "100%",
          color: "#111942",
          maxHeight: "96vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: { xs: 0.5, sm: 1.5 } }}>
          <Box
            component="img"
            src={logo}
            alt="Cabinet Visualizer"
            sx={{
              width: { xs: 100, sm: 140, md: 180 },
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "#111942",
            fontSize: { xs: "1rem", sm: "1.4rem", md: "1.7rem" },
            mb: { xs: 0.5, sm: 1 },
            lineHeight: 1.2,
          }}
        >
          WELCOME TO CABINET VISUALIZER
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontWeight: 700,
            my: { xs: 0.5, sm: 1 },
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          Here's what you can do:
        </Typography>

        {/* Feature list */}
        <List
          dense
          // disablePadding
          sx={{
            width: { xs: "100%", sm: "90%" },
            mx: "auto",
            textAlign: "left",
            mb: { xs: 0.5, sm: 1.5 },
          }}
        >
          {[
            "Browse cabinet layouts for different rooms",
            "Choose from multiple colors of cabinets, countertops, backsplashes, and more",
            "Share this visualizer with friends to get their input",
          ].map((text, i) => (
            <ListItem
              key={i}
              disableGutters
              sx={{ alignItems: "flex-start", py: 0.25 }}
            >
              <ListItemText
                primary={`• ${text}`}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: { xs: "0.72rem", sm: "0.875rem" },
                  lineHeight: 1.3,
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Explore text */}
        <Typography
          sx={{
            fontWeight: 700,
            my: { xs: 0.5, sm: 1 },
            fontSize: { xs: "0.85rem", sm: "1.1rem" },
          }}
        >
          Explore all the options we offer!
        </Typography>

        {/* Animated Get Started button */}
        <Box
          sx={{
            mt: { xs: 1, sm: 2 },
            position: "relative",
            display: "inline-block",
          }}
        >
          <button
            onClick={() => setScreen("spaceType")}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "20px 40px",
              color: "white",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            className="get-started-btn"
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                transition: "background-color 1s",
                zIndex: 0,
              }}
              className="btn-bg"
            />
            <span
              style={{
                position: "absolute",
                width: "120%",
                height: "40px",
                backgroundColor: "#00ccff",
                left: "50%",
                top: 0,
                transform: "translateX(-50%) translateY(-50%)",
                animation: "rotate 3s linear infinite",
                transformOrigin: "center center",
                transition: "height 1s",
                zIndex: 1,
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: "4px",
                backgroundColor: "#0e1538",
                transition: "background-color 0.5s",
                zIndex: 2,
              }}
              className="btn-inner"
            />
            <span
              style={{
                position: "relative",
                zIndex: 10,
                color: "white",
                fontSize: "0.95rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                opacity: 0.5,
                transition: "opacity 0.3s",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
              className="btn-text"
            >
              GET STARTED
            </span>
          </button>
          <style>{`
            @keyframes rotate {
              0% { transform: translate(-50%, 100%) rotate(0deg); }
              100% { transform: translate(-50%, 100%) rotate(360deg); }
            }
            .get-started-btn:hover .btn-bg { background-color: #00ccff !important; }
            .get-started-btn:hover .btn-inner { background-color: #00ccff !important; }
            .get-started-btn:hover .btn-text { opacity: 1 !important; }
          `}</style>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
