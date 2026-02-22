import { useContext } from "react";
import { VisualizerContext } from "../context/VisualizerContext";
import Welcome from "../components/Welcome";
import Space from "./Space";
import Shape from "./Shape";
import Visualizer from "./Visualizer";
import AvailableItems from "./AvailableItems";
import { Box, CircularProgress, Typography } from "@mui/material";

const CabinetVisualizer = () => {
  const {
    screen,
    setScreen,
    currentSpaceIndex,
    currentKitchenShapeIndex,
    setCurrentKitchenShapeIndex,
    setSelectedKitchenShapeId,
    selectedMainBackground,
    appData,
    spaces,
    kitchenShapes,
    availableItemsData,
    handleNextSpace,
    handlePrevSpace,
    handleNextKitchenShape,
    handlePrevKitchenShape,
    availableItemIndex,
    typesConfiguration,
  } = useContext(VisualizerContext);

  if (!typesConfiguration) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          bgcolor: "#1a1a2e",
          color: "white",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="body1">Loading application data...</Typography>
      </Box>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return <Welcome setScreen={setScreen} />;

      case "spaceType":
        let displayedSpaces = [];
        if (spaces.length > 0) {
          let endIndex = currentSpaceIndex + 4;
          if (endIndex <= spaces.length) {
            displayedSpaces = spaces.slice(currentSpaceIndex, endIndex);
          } else {
            displayedSpaces = spaces
              .slice(currentSpaceIndex)
              .concat(spaces.slice(0, endIndex - spaces.length));
          }
        }
        return (
          <Space
            setScreen={setScreen}
            spaces={displayedSpaces}
            setCurrentKitchenShapeIndex={setCurrentKitchenShapeIndex}
            handleNextSpace={handleNextSpace}
            handlePrevSpace={handlePrevSpace}
          />
        );

      case "kitchenShape":
        let displayedKitchenShapes = [];
        if (kitchenShapes?.length > 0) {
          let endIndex = currentKitchenShapeIndex + 3;
          if (endIndex <= kitchenShapes?.length) {
            displayedKitchenShapes = kitchenShapes?.slice(
              currentKitchenShapeIndex,
              endIndex,
            );
          } else {
            displayedKitchenShapes = kitchenShapes
              ?.slice(currentKitchenShapeIndex)
              ?.concat(
                kitchenShapes?.slice(0, endIndex - kitchenShapes?.length),
              );
          }
        }
        return (
          <Shape
            shapes={displayedKitchenShapes}
            setScreen={setScreen}
            setSelectedKitchenShapeId={setSelectedKitchenShapeId}
            handleNextKitchenShape={handleNextKitchenShape}
            handlePrevKitchenShape={handlePrevKitchenShape}
          />
        );

      case "availableItems":
        let availableItems = [];
        if (availableItemsData?.length > 0) {
          let endIndex = availableItemIndex + availableItemsData?.length;
          if (endIndex <= availableItemsData?.length) {
            availableItems = availableItemsData?.slice(
              availableItemIndex,
              endIndex,
            );
          } else {
            availableItems = availableItemsData
              ?.slice(availableItemIndex)
              ?.concat(
                availableItemsData?.slice(
                  0,
                  endIndex - availableItemsData?.length,
                ),
              );
          }
        }
        return (
          <AvailableItems
            availableItems={availableItems}
            setScreen={setScreen}
            setSelectedKitchenShapeId={setSelectedKitchenShapeId}
            handleNextKitchenShape={handleNextKitchenShape}
            handlePrevKitchenShape={handlePrevKitchenShape}
          />
        );

      case "visualizer":
        if (!selectedMainBackground || !selectedMainBackground.thumbnail) {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100vh",
                bgcolor: "#1a1a2e",
                color: "white",
                gap: 2,
              }}
            >
              <CircularProgress color="inherit" />
              <Typography variant="body1">Loading Visualizer...</Typography>
            </Box>
          );
        }
        return <Visualizer />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {renderScreen()}
    </Box>
  );
};

export default CabinetVisualizer;
