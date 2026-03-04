import {
  Box,
  Button,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { VisualizerContext } from "./../../context/VisualizerContext";
import { Icon } from "@iconify/react";
import { CATEGORIES } from "../../utils/constants/constant";

const SidebarContent = ({ organizedLayerData, openPopup, onClose }) => (
  <>
    {Object.keys(organizedLayerData).map((category) => {
      if (category === "Crown Moldings") return null;
      return (
        <Button
          key={category}
          onClick={(e) => {
            openPopup(category, "sidebar");
            if (onClose) onClose();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: 80, md: 90 },
            width: "100%",
            color: "white",
            borderRadius: 0,
            borderBottom: "1px solid #444",
            "&:hover": { bgcolor: "#333" },
            px: 0.5,
          }}
        >
          <Icon
            icon={
              CATEGORIES[category.toUpperCase().replace(" ", "_")]?.icon ||
              "ix:tiles-filled"
            }
            height={22}
            width={22}
          />
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              lineHeight: 1.1,
              textAlign: "center",
              fontSize: "0.7rem",
              whiteSpace: "pre-line",
            }}
          >
            {category.replace(" ", "\n")}
          </Typography>
        </Button>
      );
    })}
  </>
);

const Sidebar = () => {
  const { organizedLayerData, isPreviewMode, openPopup } =
    useContext(VisualizerContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isPreviewMode) return null;

  if (isMobile) {
    return (
      <>
        {/* Floating toggle button on mobile */}
        <IconButton
          onClick={() => setMobileOpen(prev => !prev)}
          sx={{
            // display: mobileOpen ? "none" : "flex",
            position: "absolute",
            top: 0,
            left: mobileOpen ? 80 : 8,
            zIndex: 1300,
            bgcolor: "black",
            color: "white",
            border: "1px solid #444",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={mobileOpen}
          // onClose={() => setMobileOpen(false)}
          hideBackdrop
          PaperProps={{
            sx: {
              mt:5,
              width: 80,
              bgcolor: "black",
              pt: 1,
            },
          }}
        >
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end", px: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => setMobileOpen(false)}
              sx={{ color: "white" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box> */}
          <SidebarContent
            organizedLayerData={organizedLayerData}
            openPopup={openPopup}
            onClose={() => setMobileOpen(false)}
          />
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        width: 90,
        flexShrink: 0,
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <SidebarContent
        organizedLayerData={organizedLayerData}
        openPopup={openPopup}
      />
    </Box>
  );
};

export default Sidebar;
