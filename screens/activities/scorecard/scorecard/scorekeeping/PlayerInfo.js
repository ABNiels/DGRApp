import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../../GlobalStyles";

const PlayerInfo = ({ style, playerName, score }) => {
  return (
    <View style={[styles.playerInfo, style]}>
      <Text style={[styles.playerName, styles.scoreInfoTypo]}>{playerName}</Text>
      <View style={styles.scoreInfoWrapper}>
        <Text style={[styles.scoreInfo, styles.scoreInfoTypo]}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreInfoTypo: {
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.interThin,
    fontWeight: "100",
    alignSelf: "stretch",
  },
  playerName: {
    fontSize: FontSize.size_xl,
  },
  scoreInfo: {
    flex: 1,
    fontSize: 15,
  },
  scoreInfoWrapper: {
    height: 18,
    flexDirection: "row",
    marginTop: 2,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  playerInfo: {
    width: 175,
    paddingHorizontal: 2,
    paddingVertical: 6,
    overflow: "hidden",
  },
});

export default PlayerInfo;
