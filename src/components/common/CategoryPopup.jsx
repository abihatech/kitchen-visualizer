import { VisualizerContext } from "../../context/VisualizerContext";
import { useContext } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const CategoryPopup = () => {
  const {
    activeCategory,
    organizedLayerData,
    appliedLayers,
    closePopups,
    handleSelectItem,
  } = useContext(VisualizerContext);

  const selectedItemForCategoryList =
    appliedLayers[activeCategory] || appliedLayers["Door Style"];

  return (
    <Card
      sx={{
        bgcolor: "rgba(40, 40, 40, 0.85)",
        width: "75vw",
        maxWidth: 900,
        height: "80vh",
        backdropFilter: "blur(5px)",
      }}
    >
      {/* <Typography variant="h5" component="h3" sx={{ color: 'white', textTransform: 'uppercase', mb: 2, textAlign: 'center' }}>{activeCategory}</Typography> */}
      <Box
        sx={{ height: "30px", width: "100%", backgroundColor: "gray", mb: 1 }}
      >
        <IconButton
          size="small"
          onClick={closePopups}
          sx={{
            position: "absolute",
            right: 8,
            top: 3,
            color: "white",
            backgroundColor: "black",
            borderRadius: "0px",
            height: "25px",
          }}
        >
          <CloseIcon sx={{ padding: "5px" }} />
        </IconButton>
      </Box>
      <Box sx={{ height:"100%", maxHeight: "72vh", overflowY: "scroll", px: 4, pt: 4 }}>
        <Grid
          container
          xs={6}
          sm={4}
          md={3}
          rowSpacing={2}
          columnSpacing={18}
          sx={{ margin: "auto" }}
        >
          {organizedLayerData[activeCategory]?.map((item) => {
            const isSelected = selectedItemForCategoryList?.id === item.id;
            const img = item.texture_url || item.png_layer_url || "https://placehold.co/150x150/F5F5F5/000000?text=NA";
            return (
              <Grid item key={item.id} sx={{ textAlign: "center" }} width={120}>
                <Box
                  onClick={() => handleSelectItem(activeCategory, item)}
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
                    width={85}
                    component="img"
                    src={img}
                    alt={img}
                    sx={{
                      // maxWidth: 100,
                      // maxHeight: 100,
                      objectFit: "contain",
                      borderRadius: "4px",
                      backgroundColor: "transparent",
                    }}
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/150x150/F5F5F5/000000?text=NA")
                    }
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, color: "white", mt: 1 }}
                >
                  {item.texture_name || item.png_layer_name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};

export default CategoryPopup;
