import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontFamily, Color } from "../../../../../GlobalStyles";

const HoleNumberNavigation = ({number, callbacks}) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity onPress={() => callbacks.updateHoleStatic(number-1)}>
      <Text style={styles.text}>{number}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: "center", // Center text horizontally
    fontSize: 32,
    fontWeight: "100",
    fontFamily: FontFamily.interThin,
    color: Color.black,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  parent: {
    backgroundColor: Color.white,
    borderStyle: "solid",
    borderColor: Color.black,
    borderWidth: 1,
    width: 44, // Set the width to 44px
    height: "100%", // Take the full height of the parent
    overflow: "hidden",
  },
});

export default HoleNumberNavigation;