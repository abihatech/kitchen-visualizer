import { VisualizerContext } from '../context/VisualizerContext';
import { useContext } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import Footer from './common/Footer';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import SelectedItemPopup from './common/SelectedItemPopup';
import ImageSetter from './common/ImageSetter';
import CategoryPopup from './common/CategoryPopup';

const Visualizer = () => {
    const { showCategoryPopup, showSelectedItemPopup, activeCategory, appliedLayers, showFullCategory, closePopups } = useContext(VisualizerContext);

    const getSelectedItem = (category) => {
        if (!category) return null;
        if (category === 'Door Style') {
            return {
                base: appliedLayers['Base Cabinets'],
                wall: appliedLayers['Wall Cabinets']
            };
        }
        return { base: appliedLayers[category] };
    };

    const doorStyle = activeCategory === "Wall Cabinets" || activeCategory === "Base Cabinets" ? "Door Style" : activeCategory;
    const currentSelectedItem = getSelectedItem(doorStyle);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', fontFamily: 'Inter, sans-serif' }}>
            <Header />

            {/* Main Content */}
            <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
                <Sidebar />

                {/* Visualizer & Summary Area */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: '#333', position: 'relative' }}>
                    <ImageSetter />

                    {(showSelectedItemPopup || showCategoryPopup) && (
                        <Box sx={{
                            position: 'absolute',
                            top: -8,
                            left: -8,
                            right: 0,
                            bottom: 0,
                            zIndex: 1200,
                            p: 1,
                        }}>
                            <Box sx={{ display: 'flex', gap: 0.5, }}>
                                {showSelectedItemPopup && currentSelectedItem && (
                                    <ClickAwayListener onClickAway={() => closePopups()}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: "1px" }}>
                                            {currentSelectedItem.wall && (
                                                <SelectedItemPopup
                                                    category="Wall Cabinets"
                                                    item={currentSelectedItem.wall}
                                                    onSelectStyle={showFullCategory}
                                                    isWallCabinet={true}
                                                />
                                            )}
                                            {currentSelectedItem.base && (
                                                <SelectedItemPopup
                                                    category={activeCategory === 'Door Style' ? 'Base Cabinets' : activeCategory}
                                                    item={currentSelectedItem.base}
                                                    onSelectStyle={showFullCategory}
                                                />
                                            )}
                                        </Box>
                                    </ClickAwayListener>
                                )}
                                {showCategoryPopup && activeCategory && (
                                    <ClickAwayListener onClickAway={() => closePopups('category')}>
                                        <Box onClick={(e) => e.stopPropagation()}>
                                            <CategoryPopup />
                                        </Box>
                                    </ClickAwayListener>)}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}

export default Visualizer;
