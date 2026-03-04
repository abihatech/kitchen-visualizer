import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SelectedItemPopup = ({ category, item, onSelectStyle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!item) return null;
  return (
    <Box
      sx={{
        width: { xs: 140, sm: 160 },
        bgcolor: "rgba(40, 40, 40, 0.90)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
        padding: { xs: "8px 12px", sm: "10px 20px" },
      }}
    >
      <Typography
        variant="body2"
        component="h4"
        sx={{
          textTransform: "uppercase",
          fontWeight: "semibold",
          mb: 1,
          alignSelf: "center",
          fontSize: { xs: "11px", sm: "14px" },
        }}
      >
        {category}
      </Typography>
      <Button
        fullWidth
        onClick={() => onSelectStyle(category)}
        sx={{
          backgroundImage: `url(${item.texture_url || item.png_layer_url})`,
          border: "0.2rem dashed #fff",
          backgroundSize: "cover",
          objectFit: "contain",
          p: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          height: { xs: 110, sm: 150 },
          width: { xs: 80, sm: 100 },
          mb: 1,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
            borderRadius: "50%",
            border: "0.2rem solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0.5,
            backgroundColor: "#fff",
          }}
        >
          <AddIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: "black" }} />
        </Box>
        <Typography
          variant="button"
          sx={{ fontWeight: "semibold", fontSize: { xs: "9px", sm: "11px" } }}
        >
          SELECT STYLE
        </Typography>
      </Button>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{
          fontWeight: "semibold",
          color: "white",
          fontSize: { xs: "10px", sm: "12px" },
        }}
      >
        {item.name}
      </Typography>
    </Box>
  );
};

export default SelectedItemPopup;
