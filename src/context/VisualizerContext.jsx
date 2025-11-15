import { createContext, useState, useEffect, useRef, useCallback } from "react";
import l_shape from "../assets/img/l_shape.png";
import u_shape from "../assets/img/u_shape.png";
import i_shape from "../assets/img/i_shape.png";

// Helper function to group layer data by cabinet_type_name
const organizeLayerData = (layerData, mainBackgroundId) => {
  const organized = {};
  const desiredOrder = [
    "Wall Cabinets",
    "Base Cabinets",
    "Island Cabinets",
    // "Crown Moldings",
    "Countertop",
    "Backsplash",
    "Floor",
    "Appliances",
    "Wall Colors",
  ];

  // Organize regular layer data
  layerData.forEach((item) => {
    if (
      item.main_background_id === mainBackgroundId &&
      item?.png_layer_url !== "NA"
    ) {
      if (!organized[item.cabinet_type_name]) {
        organized[item.cabinet_type_name] = [];
      }
      organized[item.cabinet_type_name].push(item);
    }
  });

  // Create ordered result
  const orderedResult = {};

  // 1. Add categories in desired order
  desiredOrder.forEach((category) => {
    if (organized[category]) {
      orderedResult[category] = organized[category];
    }
  });

  // 2. Add any remaining categories that weren't in desiredOrder
  Object.keys(organized).forEach((category) => {
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
  const [typesConfiguration, setTypeConfiguration] = useState(null);
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
        const response = await fetch("../../types.json");
        const jsonData = await response.json();
        setTypeConfiguration(jsonData);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchData();
  }, []);

  const fetchDataJson = async () => {
    let mainData = [];
    const mainBgId = selectedMainBackground.id;

    const desingJson =
      mainBgId === 130 ? "../../kitchen_l_2.json" : "../../kitchen_l_1.json";
    try {
      const response = await fetch(desingJson);
      const jsonData = await response.json();
      mainData = jsonData.layerdata;
    } catch (error) {
      console.error("Error fetching design data:", error);
    }
    if (!mainData?.length) return;

    const organized = organizeLayerData(mainData, mainBgId);
    setOrganizedLayerData(organized);

    const initialLayers = {};

    // Process categories
    Object.entries(organized).forEach(([categoryName, categoryData]) => {
      const selectedItem = Array.isArray(categoryData)
        ? categoryData.find((item) => item.selected === 1)
        : null;

      if (selectedItem) {
        initialLayers[categoryName] = {
          id: selectedItem.id,
          png_layer_url: selectedItem.png_layer_url,
          name: selectedItem.texture_name || selectedItem.png_layer_name,
          texture_url: selectedItem.texture_url || selectedItem.png_layer_url,
          cabinet_type_name:
            selectedItem.cabinet_type_name || selectedItem.cabinet_type_name,
        };
      }
    });
    setAppliedLayers(initialLayers);
  };

  // Organize data and set initial layers when appData or selectedMainBackground changes
  useEffect(() => {
    if (selectedMainBackground?.id) {
      fetchDataJson();
    }
  }, [selectedMainBackground]);

  const spaces = typesConfiguration
    ? typesConfiguration.types.map((type) => ({
        name: type.name,
        image: type.thumbnail,
        id: type.id,
      }))
    : [];

  const kitchenShapes = typesConfiguration
    ? typesConfiguration.types
        ?.filter((shape) => shape?.id === 58)?.[0]
        ?.subitems?.map((shape) => ({
          ...shape,
          image:
            shape.shapes_name === "L-Shape"
              ? l_shape
              : shape.shapes_name === "U-Shape"
                ? u_shape
                : i_shape,
        }))
    : [];
  const availableItemsData = kitchenShapes?.length
    ? kitchenShapes?.filter((item) => item.id === 30)?.[0]?.subitems
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
    setShowCategoryPopup(true);
    setActiveCategory(category);
  };

  const closePopups = (source) => {
    if (source === "category") {
      setShowCategoryPopup(false);
    } else if (source === "selectedItem") {
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
    if (categoryName === "Wall Cabinets") {
      const crownMolding = organizedLayerData?.["Crown Moldings"]?.filter(
        (it) => it?.id === item?.id
      )?.[0];
      setAppliedLayers((prev) => ({
        ...prev,
        ["Crown Moldings"]: {
          id: crownMolding?.id,
          png_layer_url: crownMolding?.png_layer_url,
          name: crownMolding?.texture_name || crownMolding?.png_layer_name,
          texture_url: crownMolding?.texture_url || crownMolding?.png_layer_url,
          cabinet_type_name:
            crownMolding?.cabinet_type_name || crownMolding?.cabinet_type_name,
        },
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
    typesConfiguration,
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
