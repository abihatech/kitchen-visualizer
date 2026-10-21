import { useContext, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Chip,
} from "@mui/material";
import { VisualizerContext } from "../../context/VisualizerContext";
import DesignPreview from "./DesignPreview";

const SummaryModal = () => {
  const {
    showSummaryModal,
    setShowSummaryModal,
    appliedLayers,
    organizedLayerData,
    selectedMainBackground,
  } = useContext(VisualizerContext);

  const selectedItems = useMemo(() => {
    const orderedCategories = Object.keys(organizedLayerData || {});
    const appliedCategories = Object.keys(appliedLayers || {});
    const categories = [
      ...orderedCategories.filter((category) =>
        appliedCategories.includes(category),
      ),
      ...appliedCategories.filter(
        (category) => !orderedCategories.includes(category),
      ),
    ];

    return categories.map((category) => {
      const layer = appliedLayers?.[category];
      const fullItem = organizedLayerData?.[category]?.find(
        (item) => item.id === layer?.id,
      );
      const name =
        fullItem?.texture_name ||
        fullItem?.png_layer_name ||
        layer?.name ||
        category;
      const preview =
        fullItem?.texture_url ||
        fullItem?.png_layer_url ||
        layer?.texture_url ||
        layer?.png_layer_url;
      const attributes = [
        { label: "Type", value: category },
        fullItem?.series && { label: "Series", value: fullItem.series },
        // fullItem?.png_layer_name && {
        //   label: "Layer",
        //   value: fullItem.png_layer_name,
        // },
      ].filter(Boolean);

      return { category, name, preview, attributes };
    });
  }, [appliedLayers, organizedLayerData]);

  const handleClose = () => setShowSummaryModal(false);

  return (
    <Dialog
      open={showSummaryModal}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          bgcolor: "rgba(40, 40, 40, 0.96)",
          color: "white",
          borderRadius: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 16, fontWeight: 600 }}>
        Design Summary
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.75)", mb: 2 }}
        >
          {selectedMainBackground?.main_background_name || "Current Design"}
        </Typography>

        <Box sx={{ m: 1 }}>
          <DesignPreview maxHeight={220} />
        </Box>
        {selectedItems?.length ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {selectedItems.map((item) => {
              if (item?.category === "Crown Moldings" || item?.category === "Handle") return;
              return (
                <Box
                  key={item.category}
                  sx={{
                    border: "1px solid #444",
                    borderRadius: 1,
                    p: 1.5,
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    bgcolor: "rgba(0,0,0,0.35)",
                  }}
                >
                  {item.preview ? (
                    <Box
                      component="img"
                      src={item.preview}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      sx={{
                        width: 72,
                        height: 72,
                        // objectFit: "contain",
                        borderRadius: 1,
                        border: "1px solid #333",
                        bgcolor: "#111",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 1,
                        border: "1px solid #333",
                        bgcolor: "#111",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      No preview
                    </Box>
                  )}  
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        gap: 0.75,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.attributes.map((attr) => (
                        <Chip
                          key={`${item.category}-${attr.label}`}
                          label={`${attr.label}: ${attr.value}`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255,255,255,0.1)",
                            color: "white",
                            border: "1px solid #444",
                            fontSize: "0.7rem",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            No selections yet. Start by choosing a style.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SummaryModal;
