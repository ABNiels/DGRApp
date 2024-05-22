import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontSize, FontFamily, Color } from "../../../../../GlobalStyles";

const HoleScore = ({ style, callbacks, score, index }) => {
  return (
    <View style={[styles.holeScore, style]}>
      <Pressable onPress={() => callbacks.updateScoreDelta(index, -1)}>

      <Image
        style={styles.eiminusIcon}
        resizeMode="cover"
        source={require("../../../../../assets/eiminus.png")}
      />
      </Pressable>
      <Text style={styles.text}>{score}</Text>
      <Pressable onPress={() => callbacks.updateScoreDelta(index, +1)}>
      <Image
        style={styles.eiminusIcon}
        resizeMode="cover"
        source={require("../../../../../assets/eiplus.png")}
      />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  eiminusIcon: {
    width: 56,
    height: 56,
    overflow: "hidden",
  },
  text: {
    alignSelf: "stretch",
    fontSize: FontSize.size_17xl,
    fontWeight: "100",
    fontFamily: FontFamily.interThin,
    color: Color.black,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  holeScore: {
    width: 172,
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default HoleScore;
