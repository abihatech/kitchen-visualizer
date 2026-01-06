import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { VisualizerContext } from "./../../context/VisualizerContext";
import { Icon } from "@iconify/react";
import { CATEGORIES } from "../../utils/constants/constant";


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
        if (category === "Crown Moldings") return
        return (<Button
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
          <Icon
            icon={CATEGORIES[category.toUpperCase().replace(" ", "_")]?.icon || "ix:tiles-filled"}
            height={25}
            width={25}
          />
          <Typography
            variant="caption"
            sx={{ mt: 1, lineHeight: 1.1, textAlign: "center", fontSize: '0.8em' }}
          >
            {category.replace(" ", "\n")}
          </Typography>
        </Button>)
      })}
    </Box>
  );
};

export default Sidebar;
