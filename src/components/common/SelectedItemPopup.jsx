import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const SelectedItemPopup = ({ category, item, onSelectStyle, isWallCabinet }) => {
    if (!item) return null;
    return (
        <Box sx={{
            width: 185,
            bgcolor: 'rgba(40, 40, 40, 0.85)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
            padding: "10px 20px"
        }}>
            <Typography variant="body2" component="h4" sx={{ textTransform: 'uppercase', fontWeight: 'semibold', mb: 1, alignSelf: 'center', fontSize: "14px" }}>
                {isWallCabinet ? 'Wall Cabinets' : category}
            </Typography>
            <Button
                fullWidth
                onClick={onSelectStyle}
                sx={{
                    backgroundImage: `url(${item.texture_url || item.png_layer_url})`,
                    border: '0.2rem dashed #fff',
                    backgroundSize: 'cover',
                    objectFit: 'contain',
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    height: 150,
                    width: 100,
                    mb: 1,
                }}
            >
                <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '0.2rem solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    backgroundColor: "#fff"
                }}>

                    <AddIcon sx={{ fontSize: 40, color: 'black', }} />
                </Box>
                <Typography variant="button" sx={{ fontWeight: 'semibold' }}>SELECT STYLE</Typography>
            </Button>
            <Typography variant="subtitle2" align="center" sx={{ fontWeight: 'sembold', color: 'white', fontSize: "12px" }}>
                {item.name}
            </Typography>
        </Box>
    );
};

export default SelectedItemPopup;