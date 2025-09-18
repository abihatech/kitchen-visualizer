import { createContext, useState, useEffect, useRef, useCallback } from "react";
import l_shape from "../assets/img/l_shape.png";
import u_shape from "../assets/img/u_shape.png";
import i_shape from "../assets/img/i_shape.png";

// Helper function to group layer data by cabinet_type_name
const organizeLayerData = (layerData, moldingData, mainBackgroundId) => {
  const organized = {};
  const desiredOrder = [
    "Wall Cabinets",
    "Base Cabinets",
    "Crown Moldings",
    "Countertop",
    "Backsplash",
    "Floor",
    "Appliances",
    "Wall Colors"
  ];

  // Organize regular layer data
  layerData.forEach((item) => {
    if (item.main_background_id === mainBackgroundId || mainBackgroundId === null) {
      if (!organized[item.cabinet_type_name]) {
        organized[item.cabinet_type_name] = [];
      }
      organized[item.cabinet_type_name].push(item);
    }
  });

  // Add molding data as "Crown Moldings"
  if (moldingData && moldingData.length > 0) {
    organized["Crown Moldings"] = moldingData.filter(item =>
      item.main_background_id === mainBackgroundId || mainBackgroundId === null
    );
  }

  // Create ordered result
  const orderedResult = {};

  // 1. Add categories in desired order
  desiredOrder.forEach(category => {
    if (organized[category]) {
      orderedResult[category] = organized[category];
    }
  });

  // 2. Add any remaining categories that weren't in desiredOrder
  Object.keys(organized).forEach(category => {
    if (!desiredOrder.includes(category) && !orderedResult[category]) {
      orderedResult[category] = organized[category];
    }
  });

  return orderedResult;
};

export const VisualizerContext = createContext();

export const VisualizerProvider = ({ children }) => {
  const [screen, setScreen] = useState("welcome");
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState(0);
  const [currentKitchenShapeIndex, setCurrentKitchenShapeIndex] = useState(0);
  const [availableItemIndex, setAvailableItemIndex] = useState(0);
  const [selectedKitchenShapeId, setSelectedKitchenShapeId] = useState(null);
  const [selectedMainBackground, setSelectedMainBackground] = useState(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showSelectedItemPopup, setShowSelectedItemPopup] = useState(false);
  const [popupTriggerSource, setPopupTriggerSource] = useState(null); // 'sidebar' or 'hotspot'

  const [activeCategory, setActiveCategory] = useState(null);
  const [organizedLayerData, setOrganizedLayerData] = useState({});
  const [appData, setAppData] = useState(null);
  const [appliedLayers, setAppliedLayers] = useState({});

  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanMousePosition, setStartPanMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const visualizerRef = useRef(null);

  const [activeTool, setActiveTool] = useState("default");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isSummaryPanelExpanded, setIsSummaryPanelExpanded] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../data.json");
        const jsonData = await response.json();
        setAppData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Organize data and set initial layers when appData or selectedMainBackground changes
  useEffect(() => {
    if (appData && selectedMainBackground) {
      const mainBgId = selectedMainBackground.id;
      const organized = organizeLayerData(
        appData.layerdata,
        appData.modlingData,
        mainBgId
      );
      setOrganizedLayerData(organized);

      const initialLayers = {};

      // Process regular categories (not Door Style)
      Object.entries(organized).forEach(([categoryName, categoryData]) => {
        if (categoryName !== "Door Style") {
          const selectedItem = Array.isArray(categoryData)
            ? categoryData.find(item => item.selected === 1)
            : null;

          if (selectedItem) {
            initialLayers[categoryName] = {
              id: selectedItem.id,
              png_layer_url: selectedItem.png_layer_url,
              name: selectedItem.texture_name || selectedItem.png_layer_name,
              texture_url: selectedItem.texture_url || selectedItem.png_layer_url,
              cabinet_type_name: selectedItem.cabinet_type_name || selectedItem.cabinet_type_name,
            };
          }
        }
      });

      // Process Door Style category
      if (organized["Door Style"]) {
        // Find selected base cabinet
        const selectedBaseCabinet = organized["Door Style"]["Base Cabinets"]?.find(
          item => item.selected === 1
        );

        // Find selected wall cabinet
        const selectedWallCabinet = organized["Door Style"]["Wall Cabinets"]?.find(
          item => item.selected === 1
        );

        if (selectedBaseCabinet) {
          initialLayers["Base Cabinets"] = {
            id: selectedBaseCabinet.id,
            png_layer_url: selectedBaseCabinet.png_layer_url,
            name: selectedBaseCabinet.texture_name,
            texture_url: selectedBaseCabinet.texture_url,
          };
        }

        if (selectedWallCabinet) {
          initialLayers["Wall Cabinets"] = {
            id: selectedWallCabinet.id,
            png_layer_url: selectedWallCabinet.png_layer_url,
            name: selectedWallCabinet.texture_name,
            texture_url: selectedWallCabinet.texture_url,
          };
        }

        // If we have both base and wall cabinets with the same texture name, we can set Door Style
        if (selectedBaseCabinet && selectedWallCabinet &&
          selectedBaseCabinet.texture_name === selectedWallCabinet.texture_name) {
          initialLayers["Door Style"] = {
            id: selectedBaseCabinet.id, // or some combined ID
            name: selectedBaseCabinet.texture_name,
            texture_url: selectedBaseCabinet.texture_url,
          };
        }
      }

      setAppliedLayers(initialLayers);
    }
  }, [appData, selectedMainBackground]);

  const spaces = appData
    ? appData.types.map((type) => ({
      name: type.name,
      image: type.thumbnail,
      id: type.id,
    }))
    : [];
  const kitchenShapes = appData
    ? appData.shapes
      .filter((shape) => shape.type_category_name === "Kitchen")
      .map((shape) => ({
        name: shape.shapes_name,
        id: shape.id,
        thumbnail: shape.thumbnail,
        image:
          shape.shapes_name === "L-Shape"
            ? l_shape
            : shape.shapes_name === "U-Shape"
              ? u_shape
              : i_shape,
      }))
    : [];
  const availableItemsData = appData
    ? appData.mainbackground.filter(
      (item) => item.shape_category_name === "L-Shape"
    )
    : [];

  const handleNextSpace = () =>
    setCurrentSpaceIndex((prev) => (prev + 1) % spaces.length);
  const handlePrevSpace = () =>
    setCurrentSpaceIndex((prev) => (prev - 1 + spaces.length) % spaces.length);
  const handleNextKitchenShape = () =>
    setCurrentKitchenShapeIndex((prev) => (prev + 1) % kitchenShapes.length);
  const handlePrevKitchenShape = () =>
    setCurrentKitchenShapeIndex(
      (prev) => (prev - 1 + kitchenShapes.length) % kitchenShapes.length
    );

  const openPopup = (categoryName, source) => {
    if (isPreviewMode) return;
    setActiveCategory(categoryName);
    setPopupTriggerSource(source);
    setShowSelectedItemPopup(true);
    if (source === "hotspot") {
      setShowCategoryPopup(true);
    }
  };

  const showFullCategory = (category) => {
    setShowCategoryPopup(true)
    setActiveCategory(category);
  };

  const closePopups = (source) => {
    if (source === 'category') {
      setShowCategoryPopup(false);
    } else if (source === 'selectedItem') {
      setShowSelectedItemPopup(false);
      setActiveCategory(null);
      setPopupTriggerSource(null);
    } else {
      // Clicked outside both
      setShowCategoryPopup(false);
      setShowSelectedItemPopup(false);
      setActiveCategory(null);
      setPopupTriggerSource(null);
    }
  };

  const handleSelectItem = (categoryName, item) => {
    if (categoryName === 'Wall Cabinets') {
      const crownMolding = organizedLayerData?.['Crown Moldings']?.filter((it) => it?.id === item?.id)?.[0]
      setAppliedLayers((prev) => ({
        ...prev,
        ['Crown Moldings']: {
          id: crownMolding?.id,
          png_layer_url: crownMolding?.png_layer_url,
          name: crownMolding?.texture_name || crownMolding?.png_layer_name,
          texture_url: crownMolding?.texture_url || crownMolding?.png_layer_url,
          cabinet_type_name: crownMolding?.cabinet_type_name || crownMolding?.cabinet_type_name,
        }
      }));
    }
    setAppliedLayers((prev) => ({
      ...prev,
      [categoryName]: {
        id: item.id,
        png_layer_url: item.png_layer_url,
        name: item.texture_name || item.png_layer_name,
        texture_url: item.texture_url || item.png_layer_url,
        cabinet_type_name: item.cabinet_type_name || item.cabinet_type_name,
      },
    }));
    closePopups();
  };

  const handleZoom = (newScale) =>
    !isPreviewMode && setScale(Math.max(0.5, Math.min(3, newScale)));
  const handleZoomIn = () => handleZoom(scale + 0.1);
  const handleZoomOut = () => handleZoom(scale - 0.1);
  const handleResetZoom = () =>
    !isPreviewMode && (setScale(1), setPanOffset({ x: 0, y: 0 }));

  const toggleFullScreen = () =>
    !isPreviewMode &&
    (document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen().catch(console.error));

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => {
      if (!prev) {
        setScale(1);
        setPanOffset({ x: 0, y: 0 });
        setIsPanning(false);
        setActiveTool("default");
      }
      return !prev;
    });
  };

  const handleSummaryToggle = (e) => {
    setShowSummaryModal(e.target.checked);
    setIsSummaryPanelExpanded(true);
  };

  const toggleSummaryPanelExpand = () =>
    setIsSummaryPanelExpanded((prev) => !prev);

  const handleMouseDown = useCallback(
    (e) => {
      if (activeTool === "pan" && !isPreviewMode) {
        setIsPanning(true);
        setStartPanMousePosition({ x: e.clientX, y: e.clientY });
      }
    },
    [activeTool, isPreviewMode]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isPanning && !isPreviewMode) {
        const dx = e.clientX - startPanMousePosition.x;
        const dy = e.clientY - startPanMousePosition.y;
        setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        setStartPanMousePosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isPanning, startPanMousePosition, isPreviewMode]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);
  const handleMouseLeave = useCallback(() => setIsPanning(false), []);

  useEffect(() => {
    const vizRef = visualizerRef.current;
    if (vizRef) {
      vizRef.addEventListener("mousemove", handleMouseMove);
      vizRef.addEventListener("mouseup", handleMouseUp);
      vizRef.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        vizRef.removeEventListener("mousemove", handleMouseMove);
        vizRef.removeEventListener("mouseup", handleMouseUp);
        vizRef.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseUp, handleMouseLeave]);

  const contextValue = {
    screen,
    setScreen,
    currentSpaceIndex,
    setCurrentSpaceIndex,
    currentKitchenShapeIndex,
    setCurrentKitchenShapeIndex,
    selectedKitchenShapeId,
    setSelectedKitchenShapeId,
    selectedMainBackground,
    setSelectedMainBackground,
    showCategoryPopup,
    showSelectedItemPopup,
    popupTriggerSource,
    activeCategory,
    organizedLayerData,
    appData,
    appliedLayers,
    scale,
    panOffset,
    isPanning,
    visualizerRef,
    activeTool,
    setActiveTool,
    isPreviewMode,
    showSummaryModal,
    setShowSummaryModal,
    isSummaryPanelExpanded,
    spaces,
    kitchenShapes,
    handleNextSpace,
    handlePrevSpace,
    handleNextKitchenShape,
    handlePrevKitchenShape,
    openPopup,
    showFullCategory,
    closePopups,
    handleSelectItem,
    handleZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    toggleFullScreen,
    togglePreviewMode,
    handleSummaryToggle,
    toggleSummaryPanelExpand,
    handleMouseDown,
    availableItemsData,
    availableItemIndex,
    setAvailableItemIndex,
  };

  return (
    <VisualizerContext.Provider value={contextValue}>
      {children}
    </VisualizerContext.Provider>
  );
};
