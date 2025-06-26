import { useRef, useState } from "react";
import bgImg from "../assets/img/bg_img.webp";
import { ArrowLeft, Plus, ZoomIn, ZoomOut, RotateCcw, Share, Phone, X } from 'lucide-react';
import door_svg from '../assets/sidebarimage/doorstyles.svg';
import appliances from '../assets/sidebarimage/appliances.svg';
import countertop from '../assets/sidebarimage/countertop.svg';
import crown_modeling from '../assets/sidebarimage/crown_modeling.svg';
import floor_svg from '../assets/sidebarimage/floor.svg';
import backsplash from '../assets/sidebarimage/backsplash.svg';
import kitchen2 from "../assets/img/kitchen2.webp";



const sidebarCategories = [
  {
    id: 'door-style',
    name: 'DOOR STYLE',
    icon: door_svg,
    options: [
      { name: 'Brilliant White Shaker', color: 'white', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNjY2MiLz4KPHJlY3QgeD0iMTAiIHk9IjIwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzk5OSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==' },
      { name: 'Dove Grey Shaker', color: 'gray', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOTk5OTk5IiBzdHJva2U9IiNjY2MiLz4KPHJlY3QgeD0iMTAiIHk9IjIwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==' },
      { name: 'Southport Blue Shaker', color: 'blue', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNGE2Y2E0IiBzdHJva2U9IiNjY2MiLz4KPHJlY3QgeD0iMTAiIHk9IjIwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNTU4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==' },
      { name: 'Midtown Indigo Shaker', color: 'navy', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMmMzZTUwIiBzdHJva2U9IiNjY2MiLz4KPHJlY3QgeD0iMTAiIHk9IjIwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjUzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==' }
    ]
  },
  {
    id: 'crown-moldings',
    name: 'CROWN MOLDINGS',
    icon: crown_modeling,
    options: [
      { name: 'Traditional White', color: 'white', style: 'traditional' },
      { name: 'Modern White', color: 'white', style: 'modern' },
      { name: 'Decorative Gold', color: 'gold', style: 'decorative' },
      { name: 'Simple Wood', color: 'brown', style: 'simple' }
    ]
  },
  {
    id: 'countertops',
    name: 'COUNTERTOPS',
    icon: countertop,
    options: [
      { name: 'White Granite', color: 'white', material: 'granite' },
      { name: 'Black Granite', color: 'black', material: 'granite' },
      { name: 'Quartz Pearl', color: 'pearl', material: 'quartz' },
      { name: 'Marble Carrara', color: 'marble', material: 'marble' }
    ]
  },
  {
    id: 'backsplash',
    name: 'BACKSPLASH',
    icon: backsplash,
    options: [
      { name: 'White Subway', color: 'white', pattern: 'subway' },
      { name: 'Grey Natural Stone', color: 'grey', pattern: 'natural' },
      { name: 'Glass Mosaic', color: 'blue', pattern: 'mosaic' },
      { name: 'Metal Stainless', color: 'silver', pattern: 'metal' }
    ]
  },
  {
    id: 'floor-style',
    name: 'FLOOR STYLE',
    icon: floor_svg,
    options: [
      { name: 'Light Hardwood', color: 'light', material: 'hardwood' },
      { name: 'Dark Hardwood', color: 'dark', material: 'hardwood' },
      { name: 'Grey Tile', color: 'grey', material: 'tile' },
      { name: 'White Vinyl', color: 'white', material: 'vinyl' }
    ]
  },
  {
    id: 'appliances',
    name: 'APPLIANCES',
    icon: appliances,
    options: [
      { name: 'Light Hardwood', color: 'light', material: 'hardwood' },
      { name: 'Dark Hardwood', color: 'dark', material: 'hardwood' },
      { name: 'Grey Tile', color: 'grey', material: 'tile' },
      { name: 'White Vinyl', color: 'white', material: 'vinyl' }
    ]
  }
];

const hotspots = [
  { id: 1, x: '20%', y: '25%', category: 'crown-moldings', area: 'upper-cabinets' },
  { id: 2, x: '45%', y: '35%', category: 'door-style', area: 'upper-cabinets' },
  { id: 3, x: '70%', y: '40%', category: 'countertops', area: 'countertop' },
  { id: 4, x: '85%', y: '45%', category: 'door-style', area: 'upper-cabinets' },
  { id: 5, x: '25%', y: '60%', category: 'countertops', area: 'countertop' },
  { id: 6, x: '55%', y: '70%', category: 'backsplash', area: 'backsplash' },
  { id: 7, x: '75%', y: '80%', category: 'floor-style', area: 'floor' }
];

const Mainmenu = ({ setCurrentStep }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showStylePopup, setShowStylePopup] = useState(false);
  const [popupCategory, setPopupCategory] = useState('');
  const [selectedStyles, setSelectedStyles] = useState({
    'door-style': 'white',
    'crown-moldings': 'white',
    'countertops': 'granite',
    'backsplash': 'white',
    'floor-style': 'light'
  });
  const canvasRef = useRef(null);

  const getKitchenImageWithStyles = () => {
    // Generate kitchen image URL based on selected styles
    const doorColor = selectedStyles['door-style'];
    if (doorColor === 'blue') {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop'; // blue kitchen
    } else if (doorColor === 'white') {
      return 'https://images.unsplash.com/photo-1556909185-4d582653d7e1?w=1200&h=800&fit=crop'; // white kitchen
    } else if (doorColor === 'gray') {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&sat=-50'; // gray kitchen
    }
    return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop';
  };

  const handleHotspotClick = (hotspot) => {
    setPopupCategory(hotspot.category);
    setShowStylePopup(true);
    setActiveHotspot(hotspot.id);
  };

  const handleStyleSelect = (category, option) => {
    setSelectedStyles(prev => ({
      ...prev,
      [category]: option.color || option.material || option.style
    }));
    setShowStylePopup(false);
    setActiveHotspot(null);
    // Apply visual changes to kitchen image
    applyStyleToKitchen(category, option);
  };

  const applyStyleToKitchen = (category, option) => {
    // This would integrate with a canvas or image manipulation library
    // For now, we'll simulate the visual change by updating state
    console.log(`Applying ${category}: ${option.name}`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-gray-100 shadow-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6 ml-10 text-sm">
          <button className="px-4 py-2 border-1 border-gray-400 text-black hover:bg-gray-50">
            START A NEW DESIGN
          </button>
          <div className="px-4 py-2 flex items-center space-x-2 border-1 border-gray-400 text-black">
            <input
              type="checkbox"
              id="summary"
              checked={showSummary}
              onChange={(e) => setShowSummary(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="summary" className="text-black text-l">SUMMARY</label>
          </div>
        </div>
        <div className="flex items-center space-x-2 mr-6 text-sm">
          <button className="bg-blue-500 text-white px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 ">
            <Share size={16} />
            <span>SHARE</span>
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 flex items-center space-x-2 hover:bg-blue-700">
            <Phone size={16} />
            <span>CONTACT US</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-black ">
        {/* Left Sidebar - Categories */}
        <div className=" bg-[#00000090] text-white flex flex-col max-w-22">
          {sidebarCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
              className={`py-2 h-26 max-h-28 text-center border-b-2 border-slate-900 hover:bg-gray-700 transition-colors flex-1 flex flex-col items-center justify-center ${selectedCategory === category.id ? 'bg-gray-400 text-black' : ''
                }`}
            >
              <div className="max-w-18 max-h-20 object-contain m-auto">
                <img src={category.icon} width={60} alt={category.name} />
              </div>
              <p className="text-[11px] font-medium text-center leading-tight ">
                {category.name}
              </p>
            </button>
          ))}
        </div>

        {/* Left Options Panel - Fixed Position */}
        {showStylePopup && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto z-30">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {popupCategory === 'door-style' ? 'BASE CABINETS' :
                    sidebarCategories.find(cat => cat.id === popupCategory)?.name}
                </h3>
                <button
                  onClick={() => setShowStylePopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {popupCategory === 'door-style' && (
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl">
                      <Plus size={24} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">SELECT</div>
                    <div className="text-sm font-medium text-gray-800">STYLE</div>
                  </div>
                  <div className="mt-4 p-2 border-2 border-dashed border-blue-400 bg-blue-50">
                    <div className="text-center text-sm text-blue-600 font-medium">
                      {sidebarCategories.find(cat => cat.id === 'door-style')
                        ?.options.find(opt => opt.color === selectedStyles['door-style'])?.name || 'Current Selection'}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {sidebarCategories
                  .find(cat => cat.id === popupCategory)
                  ?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleStyleSelect(popupCategory, option)}
                      className={`text-center p-3 border-2 rounded transition-colors ${selectedStyles[popupCategory] === option.color
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      {popupCategory === 'door-style' && option.image ? (
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-full h-28 object-cover mb-2 rounded"
                        />
                      ) : (
                        <div
                          className="w-full h-28 mb-2 rounded border"
                          style={{
                            backgroundColor: option.color === 'white' ? '#ffffff' :
                              option.color === 'gray' ? '#999999' :
                                option.color === 'blue' ? '#4a6ca4' :
                                  option.color === 'navy' ? '#2c3e50' :
                                    option.color === 'black' ? '#333333' :
                                      option.color === 'gold' ? '#ffd700' :
                                        option.color === 'brown' ? '#8b4513' :
                                          option.color === 'pearl' ? '#f8f8ff' :
                                            option.color === 'marble' ? '#f5f5f5' :
                                              option.color === 'grey' ? '#808080' :
                                                option.color === 'silver' ? '#c0c0c0' :
                                                  option.color === 'light' ? '#deb887' :
                                                    option.color === 'dark' ? '#654321' : '#cccccc'
                          }}
                        />
                      )}
                      <div className="text-xs font-medium text-gray-800 leading-tight">
                        {option.name}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 relative bg-[#42424290] ">
          <div className="relative w-full h-full">
            <img
              ref={canvasRef}
              src={kitchen2}
              alt="Kitchen Layout"
              className="w-full h-full object-cover transition-all duration-500 p-10"
            />

            {/* Interactive Hotspots */}
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white transition-all z-10 ${activeHotspot === hotspot.id ? 'bg-blue-600 scale-110' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                style={{ left: hotspot.x, top: hotspot.y }}
              >
                <Plus size={16} />
              </button>
            ))}

            {/* Bottom Control Panel */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <button className="w-10 h-10 bg-white rounded border flex items-center justify-center hover:bg-gray-50">
                <ZoomOut size={16} />
              </button>
              <button className="w-10 h-10 bg-white rounded border flex items-center justify-center hover:bg-gray-50">
                <ZoomIn size={16} />
              </button>
              <button className="w-10 h-10 bg-white rounded border flex items-center justify-center hover:bg-gray-50">
                <RotateCcw size={16} />
              </button>
              <button className="w-10 h-10 bg-white rounded border flex items-center justify-center hover:bg-gray-50 text-sm font-medium">
                L
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-4 right-4">
              <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>


        {/* Summary Panel */}
        {showSummary && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Design Summary</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-800">Space Type</div>
                <div className="text-sm text-gray-600">{selectedSpace}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-800">Kitchen Shape</div>
                <div className="text-sm text-gray-600">{selectedShape}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-800">Status</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>)
}

export default Mainmenu