import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { VisualizerContext } from "./../../context/VisualizerContext";

import door_svg from "../../assets/sidebarimage/doorstyles.svg";
import appliances from "../../assets/sidebarimage/appliances.svg";
import countertop from "../../assets/sidebarimage/countertop.svg";
import crown_modeling from "../../assets/sidebarimage/crown_modeling.svg";
import floor_svg from "../../assets/sidebarimage/floor.svg";
import backsplash from "../../assets/sidebarimage/backsplash.svg";

const categoryIcons = {
  "Door Style": door_svg,
  "Crown Moldings": crown_modeling,
  Countertop: countertop,
  Backsplash: backsplash,
  Floor: floor_svg,
  Appliances: appliances,
  "Wall Colors": floor_svg,
};

const Sidebar = () => {
  const { organizedLayerData, isPreviewMode, openPopup } =
  useContext(VisualizerContext);
  
  if (isPreviewMode) return null;

  return (
    <Box
      component="aside"
      sx={{
        width: 100,
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
      }}
    >
      {Object.keys(organizedLayerData).map((category) => {
        if(category === "Base Cabinets" || category === "Wall Cabinets"){
          if(category === "Base Cabinets") return
          return (
            <Button
              key={category}
              onClick={(e) => openPopup("Door Style", "sidebar")}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 90,
                color: "white",
                borderRadius: 0,
                borderBottom: "1px solid #444",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              <img
                src={categoryIcons["Door Style"]}
                alt={"Door Style"}
                style={{ height: 38, width: 38, objectFit: "contain" }}
              />
              <Typography
                variant="caption"
                sx={{ mt: 0.5, lineHeight: 1.1, textAlign: "center" }}
              >
                Door Style
              </Typography>
            </Button>
          )
        }
        
       return( <Button
          key={category}
          onClick={(e) => openPopup(category, "sidebar")}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 90,
            color: "white",
            borderRadius: 0,
            borderBottom: "1px solid #444",
            "&:hover": { bgcolor: "#333" },
          }}
          >
          <img
            src={categoryIcons[category]}
            alt={category}
            style={{ height: 38, width: 38, objectFit: "contain" }}
          />
          <Typography
            variant="caption"
            sx={{ mt: 0.5, lineHeight: 1.1, textAlign: "center" }}
          >
            {category.replace(" ", "\n")}
          </Typography>
        </Button>)
})}
    </Box>
  );
};

export default Sidebar;
