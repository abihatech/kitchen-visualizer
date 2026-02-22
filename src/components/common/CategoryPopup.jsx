import { VisualizerContext } from "../../context/VisualizerContext";
import { useContext } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategoryPopup = () => {
  const {
    activeCategory,
    organizedLayerData,
    appliedLayers,
    closePopups,
    handleSelectItem,
  } = useContext(VisualizerContext);

  const selectedItemForCategoryList = appliedLayers[activeCategory];

  const renderItemGrid = (items) => (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 5, sm: 8},
        justifyContent: "flex-start",
        p: { xs: 1, sm: 1.5 },
      }}
    >
      {items.map((item) => {
        const isSelected = selectedItemForCategoryList?.id === item.id;
        const img =
          item.texture_url ||
          item.png_layer_url ||
          "https://placehold.co/150x150/F5F5F5/000000?text=NA";

        return (
          <Box
            key={item.id}
            sx={{ textAlign: "center", width: { xs: 80, sm: 95, md: 110 } }}
          >
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handleSelectItem(activeCategory, item);
              }}
              sx={{
                cursor: "pointer",
                display: "inline-block",
                borderRadius: "4px",
                transition: "all 0.2s ease-in-out",
                border: "1px solid rgb(255, 255, 255)",
                filter: isSelected
                  ? "drop-shadow(rgba(35, 255, 90, 1) 0px 0px 3px)"
                  : "drop-shadow(rgb(255, 255, 255) 0px 0px 3px)",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px",
                "&:hover": {
                  boxShadow: "1px 1px 5px 1px #66bb6a",
                  filter: "drop-shadow(rgba(35, 255, 90, 1) 0px 0px 3px)",
                },
              }}
            >
              <Box
                component="img"
                src={img}
                alt={item.texture_name || item.png_layer_name}
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/150x150/F5F5F5/000000?text=NA")
                }
                sx={{
                  width: { xs: 65, sm: 80, md: 95 },
                  height: { xs: 85, sm: 110, md: 160 },
                  objectFit: "unset",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  display: "block",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: "white",
                mt: 0.5,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                lineHeight: 1.2,
                wordBreak: "break-word",
              }}
            >
              {item.texture_name || item.png_layer_name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );

  const items = organizedLayerData[activeCategory] || [];

  let framedItems = [];
  let framelessItems = [];

  if (
    activeCategory === "Wall Cabinets" ||
    activeCategory === "Base Cabinets" ||
    activeCategory === "Island Cabinets"
  ) {
    framedItems = items.filter(
      (item) =>
        item.png_layer_url?.includes("framed") ||
        item.texture_url?.includes("framed"),
    );
    framelessItems = items.filter(
      (item) =>
        item.png_layer_url?.includes("frameless") ||
        item.texture_url?.includes("frameless"),
    );
  }

  const groupBySeries = (items) => {
    return items.reduce((acc, item) => {
      const seriesName = item.series || "Others";
      if (!acc[seriesName]) acc[seriesName] = [];
      acc[seriesName].push(item);
      return acc;
    }, {});
  };

  const renderSeriesAccordions = (items) => {
    const grouped = groupBySeries(items);
    return Object.keys(grouped)?.map((series) => (
      <Accordion
        key={series}
        disableGutters
        sx={{ backgroundColor: "transparent", ml: { xs: 0, sm: 2 } }}
        onClick={(e) => e.stopPropagation()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "12px", sm: "14px" },
              fontWeight: 500,
            }}
          >
            {series?.charAt(0).toUpperCase() + series?.slice(1) + " Series"} (
            {grouped[series].length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 0.5, sm: 1 } }}>
          {renderItemGrid(grouped[series])}
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <Card
      onClick={(e) => e.stopPropagation()}
      sx={{
        bgcolor: "rgba(40, 40, 40, 0.96)",
        /* Width: responsive but bounded */
        width: { xs: "calc(100vw - 180px)", sm: "65vw", md: "70vw" },
        minWidth: { xs: 220, sm: 380 },
        maxWidth: { sm: 680, md: 900 },
        /* Height: use max-height so content determines height, never overflows screen */
        maxHeight: { xs: "calc(100vh - 120px)", sm: "82vh" },
        minHeight: { xs: "calc(100vh - 120px)", sm: "82vh" },
        backdropFilter: "blur(5px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <Box
        sx={{
          height: 32,
          width: "100%",
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "11px", sm: "13px" },
            fontWeight: 600,
          }}
        >
          {activeCategory}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            closePopups();
          }}
          sx={{
            color: "white",
            backgroundColor: "black",
            borderRadius: "0px",
            height: "26px",
            width: "26px",
            flexShrink: 0,
            "&:hover": { bgcolor: "#333" },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Scrollable content */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: { xs: 0.5, sm: 2 },
          pt: { xs: 1, sm: 2 },
          pb: 1,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#666",
            borderRadius: "3px",
          },
        }}
      >
        {activeCategory === "Wall Cabinets" ||
        activeCategory === "Base Cabinets" ||
        activeCategory === "Island Cabinets" ? (
          <>
            <Accordion
              disableGutters
              sx={{ backgroundColor: "transparent" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "13px", sm: "16px" },
                    fontWeight: 600,
                  }}
                >
                  Framed Cabinets ({framedItems.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: { xs: 0.5, sm: 1 },
                }}
              >
                {renderSeriesAccordions(framedItems)}
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters
              sx={{ backgroundColor: "transparent", mt: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "13px", sm: "16px" },
                    fontWeight: 600,
                  }}
                >
                  Frameless Cabinets ({framelessItems.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: { xs: 0.5, sm: 1 },
                }}
              >
                {renderSeriesAccordions(framelessItems)}
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          renderItemGrid(items)
        )}
      </Box>
    </Card>
  );
};

export default CategoryPopup;
