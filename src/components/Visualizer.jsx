import { VisualizerContext } from '../context/VisualizerContext';
import React, { useContext } from 'react'
import door_svg from '../assets/sidebarimage/doorstyles.svg';
import appliances from '../assets/sidebarimage/appliances.svg';
import countertop from '../assets/sidebarimage/countertop.svg';
import crown_modeling from '../assets/sidebarimage/crown_modeling.svg';
import floor_svg from '../assets/sidebarimage/floor.svg';
import backsplash from '../assets/sidebarimage/backsplash.svg';

const hotspots = [
    { top: '40%', left: '20%', category: 'Door Style' },
    { top: '70%', left: '38%', category: 'Door Style' },
    { top: '60%', left: '70%', category: 'Countertop' },
    { top: '90%', left: '60%', category: 'Floor' },
    { top: '45%', left: '87%', category: 'Appliances' },
    { top: '25%', left: '65%', category: 'Backsplash' },
    { top: '20%', left: '15%', category: 'Crown Moldings' },
];

const categoryIcons = {
    "Door Style": door_svg,
    "Crown Moldings": crown_modeling,
    "Countertop": countertop,
    "Backsplash": backsplash,
    "Floor": floor_svg,
    "Appliances": appliances,
};


const Visualizer = () => {

    const {
        setScreen,
        selectedMainBackground,
        showCategoryPopup,
        activeCategory,
        organizedLayerData,
        appliedLayers,
        scale,
        panOffset,
        isPanning,
        visualizerRef,
        activeTool, setActiveTool,
        isPreviewMode, togglePreviewMode,
        showSummaryModal, setShowSummaryModal,
        isSummaryPanelExpanded, toggleSummaryPanelExpand,
        openCategoryPopup, closeCategoryPopup,
        handleSelectItem,
        handleZoom, handleZoomIn, handleZoomOut, handleResetZoom,
        toggleFullScreen,
        handleSummaryToggle,
        handleMouseDown,
    } = useContext(VisualizerContext);


    return (
        <div className="relative w-full h-screen bg-gray-100 flex flex-col font-['Inter']">
            {/* Header */}
            <header className="w-full bg-gray-100 text-black px-8 py-2 flex justify-between items-center z-10 shadow-gray-700 shadow-sm">
                <div className="flex items-center space-x-8 text-sm">
                    {!isPreviewMode && (
                        <button className="uppercase cursor-pointer px-4 py-2 border-1 border-gray-400 text-black" onClick={() => setScreen('welcome')}>START A NEW DESIGN</button>
                    )}
                    <div className="flex items-center px-4 py-2 border-1 border-gray-400 text-black hover:bg-gray-5">
                        <input
                            type="checkbox"
                            id="summary"
                            className="mr-2"
                            checked={showSummaryModal}
                            onChange={handleSummaryToggle}
                        />
                        <label htmlFor="summary" className="uppercase cursor-pointer ">SUMMARY</label>

                    </div>
                    <div className="flex items-center px-4  border-gray-400 text-black">
                        <label htmlFor="preview-toggle" className="cursor-pointer flex items-center">
                            <span className="text-sm mr-2 uppercase">PREVIEW</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="preview-toggle"
                                    className="sr-only"
                                    checked={isPreviewMode}
                                    onChange={togglePreviewMode}
                                />
                                <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isPreviewMode ? 'translate-x-full bg-blue-500' : ''
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    {!isPreviewMode && (
                        <>
                            <button className="flex items-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 4.37" /><path d="m15.41 6.49-6.83 4.37" /></svg>
                                SHARE
                            </button>
                            <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition">CONTACT US</button>
                        </>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <div className={`flex flex-grow relative ${isPreviewMode ? 'w-full' : ''}`}>
                {!isPreviewMode && (
                    <aside className="w-24 bg-black flex flex-col overflow-hidden">
                        {Object.keys(organizedLayerData).map(category => (
                            (category === "Base Cabinets" || category === "Wall Cabinets") ? null : (
                                <button
                                    key={category}
                                    className="w-full h-20 text-center hover:bg-gray-700 transition-colors flex flex-col items-center justify-center border-b border-gray-700"
                                    onClick={() => openCategoryPopup(category)}
                                >
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <img
                                            src={categoryIcons[category]}
                                            alt={category}
                                            className="max-h-full max-w-full object-contain"
                                            width={75}
                                        />
                                    </div>
                                    <p className="text-xs text-white mt-1 ">
                                        {category.split(' ').join('\n')}
                                    </p>
                                </button>
                            )
                        ))}
                    </aside>
                )}

                {/* Image Visualizer Area + Summary Panel Container */}
                <div className={`flex-grow flex flex-col px-14  bg-[#000000de] overflow-hidden ${isPreviewMode ? 'w-full' : ''}`}>
                    <main
                        ref={visualizerRef}
                        className="relative overflow-hidden flex items-center justify-center transition-all duration-300 ease-in-out"
                        onMouseDown={handleMouseDown}
                        style={{
                            cursor: isPanning ? 'grabbing' : (activeTool === 'pan' && !isPreviewMode ? 'grab' : 'default'),
                            flexGrow: 1,
                            height: showSummaryModal ? (isSummaryPanelExpanded ? 'calc(100% - 250px)' : 'calc(100% - 60px)') : '100%',
                        }}
                    >
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                transform: `scale(${scale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                                transformOrigin: 'center center',
                                transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                            }}
                        >
                            <img
                                src={selectedMainBackground?.thumbnail}
                                alt="Room Background"
                                className="w-full h-full object-inherit"
                            />

                            {Object.keys(appliedLayers).map(categoryName => {
                                const layer = appliedLayers[categoryName];
                                if (layer && layer.png_layer_url) {
                                    return (
                                        <img
                                            key={categoryName}
                                            src={layer.png_layer_url}
                                            alt={`${categoryName} Layer`}
                                            className="absolute top-0 left-0 w-full h-full object-inherit"
                                        />
                                    );
                                }
                                return null;
                            })}

                            {!isPreviewMode && (
                                hotspots.map((hotspot, index) => (
                                    <button
                                        key={index}
                                        className="absolute bg-[#000000a8] text-white w-9 h-9 rounded-full flex items-center justify-center font-normal text-xl cursor-pointer shadow-md hover:scale-110 transition-transform z-20"
                                        style={{
                                            top: hotspot.top,
                                            left: hotspot.left,
                                            transform: `scale(${1 / scale})`,
                                            transformOrigin: 'center center',
                                        }}
                                        onClick={() => openCategoryPopup(hotspot.category)}
                                    >
                                        +
                                    </button>
                                ))
                            )}
                        </div>
                    </main>

                    {/* Summary Panel */}
                    {showSummaryModal && (
                        <div className={`bg-white text-black flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden`}
                            style={{ height: isSummaryPanelExpanded ? '250px' : '60px' }}
                        >
                            <div className="p-4 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">Selected Options</h3>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                                            onClick={() => setShowSummaryModal(false)}
                                        >
                                            OK
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                                        </button>
                                        <button
                                            className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                                            onClick={toggleSummaryPanelExpand}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide ${isSummaryPanelExpanded ? 'lucide-chevron-up' : 'lucide-chevron-down'}`}>
                                                {isSummaryPanelExpanded ? (
                                                    <polyline points="18 15 12 9 6 15" />
                                                ) : (
                                                    <polyline points="6 9 12 15 18 9" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {isSummaryPanelExpanded && (
                                    <div className="flex-grow grid grid-cols-2 gap-4 overflow-y-auto">
                                        {Object.entries(appliedLayers).map(([categoryName, item]) => {
                                            if (!item || !item.name) return null;

                                            if (categoryName === "Base Cabinets") {
                                                return (
                                                    <React.Fragment key={categoryName}>
                                                        <div className="flex items-center space-x-2 border-b border-gray-300 py-2">
                                                            <img src={item.texture_url || item.png_layer_url} alt="Base" className="w-10 h-10 object-cover" onError={(e) => e.target.src = 'https://placehold.co/40x40/F5F5F5/000000?text=IMG'} />
                                                            <div>
                                                                <div className="text-sm text-gray-500 uppercase">BASE</div>
                                                                <div className="text-base font-semibold">{item.name}</div>
                                                            </div>
                                                        </div>
                                                        {appliedLayers["Wall Cabinets"] && (
                                                            <div className="flex items-center space-x-2 border-b border-gray-300 py-2">
                                                                <img src={appliedLayers["Wall Cabinets"].texture_url || appliedLayers["Wall Cabinets"].png_layer_url} alt="Wall" className="w-10 h-10 object-cover" onError={(e) => e.target.src = 'https://placehold.co/40x40/F5F5F5/000000?text=IMG'} />
                                                                <div>
                                                                    <div className="text-sm text-gray-500 uppercase">WALL</div>
                                                                    <div className="text-base font-semibold">{appliedLayers["Wall Cabinets"].name}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            }
                                            if (categoryName === "Wall Cabinets") {
                                                return null;
                                            }

                                            return (
                                                <div key={categoryName} className="flex items-center space-x-2 border-b border-gray-300 py-2">
                                                    <img src={item.texture_url || item.png_layer_url} alt={categoryName} className="w-10 h-10 object-cover" onError={(e) => e.target.src = 'https://placehold.co/40x40/F5F5F5/000000?text=IMG'} />
                                                    <div>
                                                        <div className="text-sm text-gray-500 uppercase">{categoryName.replace(' ', ' ')}</div>
                                                        <div className="text-base font-semibold">{item.name}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!isPreviewMode && (
                <footer className="w-full bg-black text-white px-8 py-1 flex justify-between items-center text-sm z-10">
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={scale}
                            onChange={(e) => handleZoom(parseFloat(e.target.value))}
                            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
                        />

                        <div className="flex space-x-2">
                            <button
                                className="p-2 border border-white hover:bg-white hover:text-black transition"
                                onClick={handleZoomIn}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                            </button>
                            <button
                                className="p-2 border border-white hover:bg-white hover:text-black transition"
                                onClick={handleZoomOut}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                            </button>
                            <button
                                className={`p-2 border border-white transition ${activeTool === 'pan' ? 'bg-blue-500' : 'hover:bg-white hover:text-black'}`}
                                onClick={() => setActiveTool(activeTool === 'pan' ? 'default' : 'pan')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand"><path d="M18 11.5V9a2 2 0 0 0-2-2c-1.9 0-3.3 1.1-4 2.4L7.2 14.7c-.5.9-1.3 1.3-2.2 1.3H2a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h3a2 2 0 0 0 2-2v-.4l.7-1.2c.5-.9 1.3-1.3 2.2-1.3h4.6l3.5-5.3c.7-1.1 1.5-1.7 2.4-1.7H22a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5a2 2 0 0 0-1.8 1.1Z" /></svg>
                            </button>
                            <button
                                className="p-2 border border-white hover:bg-white hover:text-black transition"
                                onClick={handleResetZoom}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crosshair"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>
                            </button>
                            <button
                                className="p-2 border border-white hover:bg-white hover:text-black transition"
                                onClick={toggleFullScreen}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><polyline points="21 21 15 21 15 15" /><polyline points="3 3 9 3 9 9" /></svg>
                            </button>
                        </div>
                    </div>
                    <span>Powered by Paramount</span>
                </footer>
            )}

            {/* Category Selection Popup */}
            {showCategoryPopup && activeCategory && (
                <div className="fixed inset-0  flex items-center justify-center z-50 font-['Inter']">
                    <div className="bg-[#2c2a2ac2] text-white p-8 relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-2/3 h-5/6 overflow-auto">
                        {/* <h3 className="text-3xl font-bold mb-6 text-center uppercase">{activeCategory}</h3> */}
                        <button
                            className="absolute top-4 right-4 p-2 text-white text-3xl hover:text-gray-400"
                            onClick={closeCategoryPopup}
                        >
                            &times;
                        </button>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {organizedLayerData[activeCategory] && organizedLayerData[activeCategory].map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full h-full flex flex-col items-center cursor-pointer"
                                    onClick={() => handleSelectItem(activeCategory, item)}
                                >
                                    <img
                                        src={item.texture_url || item.png_layer_url || 'https://placehold.co/100x100/F5F5F5/000000?text=NO+IMAGE'}
                                        alt={item.texture_name || item.png_layer_name || 'Item'}
                                        className="w-22 mb-2 object-cover shadow-md shadow-white hover:border-green-500  hover:shadow-md hover:shadow-green-500"
                                        onError={(e) => e.target.src = 'https://placehold.co/100x100/F5F5F5/000000?text=NO+IMAGE'}
                                    />
                                    <div className="w-36 text-[14px] text-center text-white">{item.texture_name || item.png_layer_name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Visualizer