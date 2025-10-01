import { VisualizerContext } from '../../context/VisualizerContext';
import { useContext } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const hotspots = [
    { top: '40%', left: '20%', category: 'Wall Cabinets' },
    { top: '70%', left: '38%', category: 'Base Cabinets' },
    { top: '60%', left: '70%', category: 'Countertop' },
    { top: '90%', left: '60%', category: 'Floor' },
    { top: '45%', left: '87%', category: 'Appliances' },
    { top: '50%', left: '63%', category: 'Backsplash' },
    // { top: '20%', left: '15%', category: 'Crown Moldings' },
    { top: '23%', left: '45%', category: 'Wall Colors' },
];


const ImageSetter = () => {
    const { selectedMainBackground, appliedLayers,
        scale, panOffset, isPanning, visualizerRef, activeTool, isPreviewMode,
        openPopup, handleMouseDown
    } = useContext(VisualizerContext);

    return (
        <Box
            component="main"
            ref={visualizerRef}
            onMouseDown={handleMouseDown}
            sx={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                overflow: 'hidden',
                cursor: isPanning ? 'grabbing' : (activeTool === 'pan' && !isPreviewMode ? 'grab' : 'default'),
            }}
        >
            <Box sx={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: `scale(${scale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center',
                transition: isPanning ? 'none' : 'transform 0.1s ease-out'
            }}>
                <img src={selectedMainBackground?.thumbnail} alt="Room Background" style={{ width: '100%', height: '100%', objectFit: 'inherit' }} />
                {Object.values(appliedLayers).map(layer => layer?.png_layer_url && (          
                    <img key={layer.png_layer_url} src={layer.png_layer_url} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'inherit',zIndex: ["Wall Cabinets","Crown Moldings"]?.includes(layer.cabinet_type_name) ? 1 : 0}}/>
                ))}
                {!isPreviewMode && hotspots.map((hotspot, index) => (
                    <IconButton key={index} onClick={() => openPopup(hotspot.category, 'hotspot')} sx={{
                        position: 'absolute', top: hotspot.top, left: hotspot.left,
                        bgcolor: 'rgba(0,0,0,0.6)', color: 'white',
                        transform: `scale(${1 / scale})`, transformOrigin: 'center center',zIndex: 2,
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                    }}>
                        <AddIcon />
                    </IconButton>
                ))}
            </Box>
        </Box>
    )
}

export default ImageSetter