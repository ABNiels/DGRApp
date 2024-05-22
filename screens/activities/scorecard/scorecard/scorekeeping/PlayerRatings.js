import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { Color, FontFamily, FontSize, Padding } from "../../../../../GlobalStyles";

const PlayerRatings = ({ style, playerRating, playerHoleRating, playerExpected }) => {
  return (
    <View style={[styles.playerRatings, style]}>
      <Text style={styles.textTypo}>{playerRating.toFixed(2)}</Text>
      <Text style={[styles.text1, styles.textTypo]}>{playerHoleRating.toFixed(2)}</Text>
      <Text style={[styles.text1, styles.textTypo]}>{playerExpected.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "center",
    color: Color.black,
    fontFamily: FontFamily.interThin,
    fontWeight: "100",
    fontSize: FontSize.size_xl,
  },
  text1: {
    marginLeft: 10,
  },
  playerRatings: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_8xs,
  },
});

export default PlayerRatings;
