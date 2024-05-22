import * as React from "react";
import { ScrollView, StyleSheet, Pressable, Image, View, Modal } from "react-native";
import HoleNavigationButton from "./navigation/HoleNavigationButton";
import HoleInformation from "./holeinformation/HoleInformation";
import PlayerFormContainer from "./scorekeeping/PlayerFormContainer";
import { Color, Padding } from "../../../../GlobalStyles";

const Scorecard = ({isVisible, data, hole, callbacks}) => {

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
    >
    <View style={styles.scorecardMain}>
      <View
        style={[styles.holeNavigation, styles.holeNavigationScrollViewContent]}
      >
        <HoleNavigationButton data={data} callbacks={callbacks}/>
      </View>
      <HoleInformation 
        data={data[hole]}
      />
      <PlayerFormContainer 
        data={data}
        hole={hole}
        callbacks={callbacks}
      />
      <View style={styles.navigation}>
        <Pressable onPress={() => callbacks.updateHoleDelta(-1)}>
        <Image
          style={styles.iconLayout}
          resizeMode="cover"
          source={require("../../../../assets/bxleftarrow.png")}
        />
        </Pressable>

        <Pressable onPress={() => callbacks.backup()}>
        <Image
          style={[styles.epfinishedIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../../../assets/epfinished.png")}
        />
        </Pressable>

        <Pressable onPress={() => callbacks.updateHoleDelta(1)}>
        <Image
          style={[styles.epfinishedIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../../../assets/bxrightarrow.png")}
        />
        </Pressable>
      </View>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  holeNavigationScrollViewContent: {
    flexDirection: "row",
    paddingHorizontal: 9,
    paddingVertical: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconLayout: {
    width: 56,
    height: 56,
    overflow: "hidden",
  },
  holeNavigation: {
    maxHeight: 56,
    height: 56,
    alignSelf: "stretch",
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
  epfinishedIcon: {
    marginLeft: 67,
  },
  navigation: {
    flexDirection: "row",
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 10,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  scorecardMain: {
    flex: 1,
    height: 783,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: 35,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Scorecard;
