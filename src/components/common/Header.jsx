import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { VisualizerContext } from "./../../context/VisualizerContext";

const Header = () => {
  const { setScreen, isPreviewMode, togglePreviewMode } =
    useContext(VisualizerContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 1.5, sm: 3, md: 4 },
        py: 1,
        bgcolor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        zIndex: 1201,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {/* Left actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.5, sm: 1.5 },
          flexWrap: "wrap",
        }}
      >
        {!isPreviewMode &&
          (isMobile ? (
            <Tooltip title="Start a New Design">
              <IconButton
                size="small"
                onClick={() => setScreen("welcome")}
                color="inherit"
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant="outlined"
              sx={{
                fontSize: "11px",
                border: "1px solid gray",
                padding: "4px 10px",
                borderRadius: "0px",
                whiteSpace: "nowrap",
              }}
              color="inherit"
              onClick={() => setScreen("welcome")}
            >
              START A NEW DESIGN
            </Button>
          ))}

        {!isMobile && (
          <Button
            variant="outlined"
            sx={{
              fontSize: "11px",
              border: "1px solid gray",
              padding: "4px 10px",
              borderRadius: "0px",
              whiteSpace: "nowrap",
            }}
            color="inherit"
            onClick={() => {}}
          >
            SUMMARY
          </Button>
        )}

        <FormControlLabel
          control={
            <Switch
              checked={isPreviewMode}
              onChange={togglePreviewMode}
              size={isMobile ? "small" : "medium"}
            />
          }
          label={isMobile ? "" : "PREVIEW"}
          labelPlacement="start"
          sx={{
            ml: 0,
            ".MuiFormControlLabel-label": {
              fontSize: "12px",
              fontWeight: 500,
              pr: 0.5,
            },
          }}
        />
      </Box>

      {/* Right actions */}
      {!isPreviewMode && (
        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
          {isMobile ? (
            <>
              <Tooltip title="Share">
                <IconButton size="small" color="primary" variant="contained">
                  <ShareIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Contact Us">
                <IconButton size="small" color="primary">
                  <ContactMailIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                sx={{
                  borderRadius: "0px",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                }}
                variant="contained"
                startIcon={<ShareIcon />}
              >
                SHARE
              </Button>
              <Button
                sx={{
                  borderRadius: "0px",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                }}
                variant="contained"
              >
                CONTACT US
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Header;
