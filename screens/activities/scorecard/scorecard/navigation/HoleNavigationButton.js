import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import HoleNumberNavigation from "./HoleNumberNavigation";
import { Color } from "../../../../../GlobalStyles";

const HoleNavigationButton = ({data, callbacks}) => {
  return (
    <FlatList
      style={styles.holeNavigationButton}
      horizontal={true}
      data={data}
      renderItem={({ item }) => {
        return <HoleNumberNavigation number={item.HoleInfo.hole} callbacks={callbacks}/>
      }}
      contentContainerStyle={styles.holeNavigationButtonContent}
    />
  );
};

const styles = StyleSheet.create({
  holeNavigationButtonContent: {
    flexDirection: "row", // Ensure items are in a row
  },
  holeNavigationButton: {
    alignSelf: "stretch",
    backgroundColor: Color.white,
    width: "100%",
    overflow: "hidden",
  },
});

export default HoleNavigationButton;
