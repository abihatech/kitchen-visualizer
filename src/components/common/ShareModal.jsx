import { useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import DesignPreview from "./DesignPreview";
import { VisualizerContext } from "../../context/VisualizerContext";

const getLayerZIndex = (layer, backgroundId) => {
  const topCategories = [
    "Wall Cabinets",
    "Crown Moldings",
    [130, 631, 641].includes(backgroundId) && "Backsplash",
  ].filter(Boolean);
  return topCategories.includes(layer?.cabinet_type_name) ? 1 : 0;
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const generateStandaloneImage = async (
  selectedMainBackground,
  appliedLayers,
) => {
  if (!selectedMainBackground?.thumbnail) return null;

  const background = await loadImage(selectedMainBackground.thumbnail);
  const canvas = document.createElement("canvas");
  canvas.width = background.naturalWidth || background.width;
  canvas.height = background.naturalHeight || background.height;
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Draw layers
  const layers = Object.values(appliedLayers || {}).filter(
    (layer) => layer?.png_layer_url,
  );

  const orderedLayers = layers.sort(
    (a, b) =>
      getLayerZIndex(a, selectedMainBackground?.id) -
      getLayerZIndex(b, selectedMainBackground?.id),
  );

  for (const layer of orderedLayers) {
    const img = await loadImage(layer.png_layer_url);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  return canvas;
};

const generateSummaryText = (selectedMainBackground, selectedItems) => {
  let summaryText = `🏠 Design Summary\n`;
  summaryText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  summaryText += `📐 Design Space: ${selectedMainBackground?.main_background_name || "Current Design"}\n\n`;
  summaryText += `✨ SELECTED ITEMS:\n`;
  summaryText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  const validItems = selectedItems.filter(
    (item) => item?.category !== "Crown Moldings",
  );

  validItems.forEach((item, index) => {
    summaryText += `${index + 1}. ${item.name}\n`;
    summaryText += `   📂 Type: ${item.category}\n`;
    item.attributes.forEach((attr) => {
      if (attr.label !== "Type") {
        summaryText += `   ${getIconForLabel(attr.label)} ${attr.label}: ${attr.value}\n`;
      }
    });
    summaryText += `\n`;
  });

  summaryText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  summaryText += `📅 Created: ${new Date().toLocaleDateString()}\n`;
  summaryText += `🕐 Time: ${new Date().toLocaleTimeString()}\n`;
  summaryText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  summaryText += `✨ Created with Peak Design Studio`;

  return summaryText;
};

const getIconForLabel = (label) => {
  const icons = {
    Series: "📦",
    Finish: "🎨",
    Color: "🎨",
    Material: "🔨",
    Brand: "🏷️",
  };
  return icons[label] || "•";
};

const ShareModal = () => {
  const {
    showShareModal,
    setShowShareModal,
    selectedMainBackground,
    appliedLayers,
    organizedLayerData,
  } = useContext(VisualizerContext);

  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const canUseNavigator = typeof navigator !== "undefined";
  const canNativeShare =
    canUseNavigator && typeof navigator.share === "function";

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
      ].filter(Boolean);

      return { category, name, preview, attributes };
    });
  }, [appliedLayers, organizedLayerData]);

  const handleClose = () => {
    setShowShareModal(false);
  };

  const handleDownload = async () => {
    if (!selectedMainBackground?.thumbnail) return;
    setDownloading(true);
    try {
      // Generate standalone image without text overlay
      const canvas = await generateStandaloneImage(
        selectedMainBackground,
        appliedLayers,
      );
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `kitchen-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    setSharing(true);
    try {
      // Generate standalone image without text overlay
      const canvas = await generateStandaloneImage(
        selectedMainBackground,
        appliedLayers,
      );

      // Convert canvas to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      // Create file from blob
      const imageFile = new File([blob], `Paramount-design-${Date.now()}.png`, {
        type: "image/png",
      });

      // Generate summary text
      const summaryText = generateSummaryText(
        selectedMainBackground,
        selectedItems,
      );

      // Check if sharing files is supported
      const canShareFiles =
        navigator.canShare && navigator.canShare({ files: [imageFile] });

      if (canShareFiles) {
        // Share image with text
        await navigator.share({
          title: "My Kitchen Design",
          text: summaryText,
          files: [imageFile],
        });
      } else {
        // Fallback: Share only text with image URL
        // Create a temporary object URL for the image
        const imageUrl = URL.createObjectURL(blob);

        await navigator.share({
          title: "My Kitchen Design",
          text: `${summaryText}\n\n[Image: Kitchen design visualization]`,
          url: imageUrl,
        });

        // Revoke the URL after sharing
        setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
      }
    } catch (error) {
      console.warn("Share cancelled or failed:", error);
    } finally {
      setSharing(false);
    }
  };

  const handleCopySummary = async () => {
    const summaryText = generateSummaryText(
      selectedMainBackground,
      selectedItems,
    );
    try {
      await navigator.clipboard.writeText(summaryText);
      alert("Summary copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy summary:", error);
    }
  };

  return (
    <Dialog
      open={showShareModal}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "rgba(40, 40, 40, 0.96)",
          color: "white",
          borderRadius: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 16, fontWeight: 600 }}>
        Share Your Design
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.75)", mb: 2 }}
        >
          Share a standalone image of your design along with all the material
          details.
        </Typography>

        <DesignPreview maxHeight={220} />

        {selectedItems.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)" }}
            >
              Summary preview:
            </Typography>
            <Box
              sx={{
                mt: 1,
                p: 1.5,
                bgcolor: "rgba(0,0,0,0.3)",
                borderRadius: 1,
                maxHeight: 200,
                overflow: "auto",
                fontFamily: "monospace",
                fontSize: "12px",
                whiteSpace: "pre-wrap",
              }}
            >
              <Typography
                variant="caption"
                component="pre"
                sx={{ m: 0, color: "rgba(255,255,255,0.8)" }}
              >
                {generateSummaryText(selectedMainBackground, selectedItems)}
              </Typography>
            </Box>
            <Button
              size="small"
              variant="text"
              onClick={handleCopySummary}
              sx={{ mt: 1, color: "rgba(255,255,255,0.7)" }}
            >
              Copy Summary Text
            </Button>
          </Box>
        )}

        {!canNativeShare && (
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.5)",
              display: "block",
              mt: 2,
              textAlign: "center",
            }}
          >
            Your browser doesn't support native sharing. You can download the
            image and copy the summary text above.
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}
      >
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "Downloading..." : "Download Image"}
        </Button>

        {canNativeShare && (
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleNativeShare}
            disabled={sharing}
          >
            {sharing ? "Preparing..." : "Share Design"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
