import * as React from "react";
import { StyleSheet, View } from "react-native";
import PlayerArea from "./PlayerArea";
import { Padding } from "../../../../../GlobalStyles";

const PlayerFormContainer = ({data, hole, callbacks}) => {
  return (
    <View style={styles.playersArea}>
      <PlayerArea 
      data={data}
      hole={hole}
      callbacks={callbacks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playersArea: {
    alignSelf: "stretch",
    flex: 1,
    overflow: "hidden",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xl,
    marginTop: 10,
  },
});

export default PlayerFormContainer;
