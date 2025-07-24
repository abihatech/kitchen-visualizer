import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import React, { useContext } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { VisualizerContext } from "./../../context/VisualizerContext";

const Header = () => {
  const {
    setScreen,
    isPreviewMode,
    togglePreviewMode,
  } = useContext(VisualizerContext);

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 1,
        bgcolor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        zIndex: 1201,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
        ".css-rizt0-MuiTypography-root": {
          fontSize: "14px",
          padding: "0px 10px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {!isPreviewMode && (
          <Button
            variant="outlined"
            sx={{
              fontSize: "12px",
              border: "1px solid gray",
              padding: "4px 10px",
              borderRadius: "0px",
            }}
            color="inherit"
            onClick={() => setScreen("welcome")}
          >
            START A NEW DESIGN
          </Button>
        )}
        <Button
          variant="outlined"
          sx={{
            fontSize: "12px",
            border: "1px solid gray",
            padding: "4px 10px",
            borderRadius: "0px",
          }}
          color="inherit"
          onClick={() => {}}
        >
          SUMMARY
        </Button>
        <FormControlLabel
          control={
            <Switch checked={isPreviewMode} onChange={togglePreviewMode} />
          }
          label="PREVIEW"
          labelPlacement="start"
        />
      </Box>
      {!isPreviewMode && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ borderRadius: "0px", fontSize: "12px" }}
            variant="contained"
            startIcon={<ShareIcon />}
          >
            SHARE
          </Button>
          <Button
            sx={{ borderRadius: "0px", fontSize: "12px" }}
            variant="contained"
          >
            CONTACT US
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
