import { createContext, useState, useEffect, useRef, useCallback } from "react";
import l_shape from "../assets/img/l_shape.png";
import u_shape from "../assets/img/u_shape.png";
import i_shape from "../assets/img/i_shape.png";

// Helper function to group layer data by cabinet_type_name
const organizeLayerData = (layerData, moldingData, mainBackgroundId) => {
  const organized = {};
  const doorStyles = {};

  layerData.forEach((item) => {
    if (
      item.main_background_id === mainBackgroundId ||
      mainBackgroundId === null
    ) {
      if (
        item.cabinet_type_name === "Base Cabinets" ||
        item.cabinet_type_name === "Wall Cabinets"
      ) {
        if (!doorStyles[item.texture_name]) {
          doorStyles[item.texture_name] = {
            id: item.id,
            texture_name: item.texture_name,
            cabinet_type_name: "Door Style",
            base_cabinet_url: null,
            wall_cabinet_url: null,
            texture_url: item.texture_url,
            png_layer_url: item.png_layer_url,
            sort_order: item.sort_order,
          };
        }
        if (item.cabinet_type_name === "Base Cabinets") {
          doorStyles[item.texture_name].base_cabinet_url = item.png_layer_url;
        } else {
          doorStyles[item.texture_name].wall_cabinet_url = item.png_layer_url;
        }
      } else {
        if (!organized[item.cabinet_type_name]) {
          organized[item.cabinet_type_name] = [];
        }
        organized[item.cabinet_type_name].push(item);
      }
    }
  });

  if (Object.keys(doorStyles).length > 0) {
    organized["Door Style"] = Object.values(doorStyles);
    organized["Door Style"].sort((a, b) => a.sort_order - b.sort_order);
  }

  moldingData.forEach((item) => {
    if (
      item.main_background_id === mainBackgroundId ||
      mainBackgroundId === null
    ) {
      if (!organized[item.cabinet_type_name]) {
        organized[item.cabinet_type_name] = [];
      }
      organized[item.cabinet_type_name].push(item);
    }
  });

  for (const category in organized) {
    if (category !== "Door Style") {
      organized[category].sort((a, b) => a.sort_order - b.sort_order);
    }
  }

  const desiredOrder = [
    "Door Style",
    "Crown Moldings",
    "Countertop",
    "Backsplash",
    "Floor",
    "Appliances",
  ];

  const orderedOrganized = {};
  const allCategories = [
    ...new Set([...desiredOrder, ...Object.keys(organized)]),
  ];
  allCategories.forEach((category) => {
    if (organized[category]) {
      orderedOrganized[category] = organized[category];
    }
  });

  return orderedOrganized;
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
      Object.values(organized).forEach((categoryItems) => {
        const selectedItem = categoryItems.find((item) => item.selected === 1);
        if (selectedItem && selectedItem.cabinet_type_name !== "Door Style") {
          initialLayers[selectedItem.cabinet_type_name] = {
            id: selectedItem.id,
            png_layer_url: selectedItem.png_layer_url,
            name: selectedItem.texture_name || selectedItem.png_layer_name,
            texture_url: selectedItem.texture_url || selectedItem.png_layer_url,
          };
        }
      });

      const initialBaseCabinet = appData.layerdata.find(
        (item) =>
          item.main_background_id === mainBgId &&
          item.cabinet_type_name === "Base Cabinets" &&
          item.selected === 1
      );
      const initialWallCabinet = appData.layerdata.find(
        (item) =>
          item.main_background_id === mainBgId &&
          item.cabinet_type_name === "Wall Cabinets" &&
          item.selected === 1
      );
      const initialDoorStyle = organized["Door Style"]?.find(
        (style) => style.base_cabinet_url === initialBaseCabinet?.png_layer_url
      );
      if (initialBaseCabinet && initialWallCabinet && initialDoorStyle) {
        initialLayers["Door Style"] = {
          id: initialDoorStyle.id,
          name: initialDoorStyle.texture_name,
          texture_url: initialDoorStyle.texture_url,
        };
        initialLayers["Base Cabinets"] = {
          id: initialBaseCabinet.id,
          png_layer_url: initialBaseCabinet.png_layer_url,
          name: initialBaseCabinet.texture_name,
          texture_url: initialBaseCabinet.texture_url,
        };
        if (initialWallCabinet) {
          initialLayers["Wall Cabinets"] = {
            id: initialWallCabinet.id,
            png_layer_url: initialWallCabinet.png_layer_url,
            name: initialWallCabinet.texture_name,
            texture_url: initialWallCabinet.texture_url,
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

  const showFullCategory = () => setShowCategoryPopup(true);

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
    if (categoryName === "Door Style") {
      setAppliedLayers((prev) => ({
        ...prev,
        "Base Cabinets": {
          ...prev["Base Cabinets"],
          png_layer_url: item.base_cabinet_url,
          name: item.texture_name,
          texture_url: item.texture_url,
        },
        "Wall Cabinets": {
          ...prev["Wall Cabinets"],
          png_layer_url: item.wall_cabinet_url,
          name: item.texture_name,
          texture_url: item.texture_url,
        },
        "Door Style": {
          id: item.id,
          name: item.texture_name,
          texture_url: item.texture_url,
        },
      }));
    } else {
      setAppliedLayers((prev) => ({
        ...prev,
        [categoryName]: {
          id: item.id,
          png_layer_url: item.png_layer_url,
          name: item.texture_name || item.png_layer_name,
          texture_url: item.texture_url || item.png_layer_url,
        },
      }));
    }
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
