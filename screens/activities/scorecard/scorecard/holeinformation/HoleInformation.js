import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Padding } from "../../../../../GlobalStyles";

const HoleInformation = ({data}) => {
  data = data.HoleInfo;
  return (
    <View style={styles.holeInformation}>
      <View style={styles.holeNumber}>
        <Image
          style={styles.tablergolfIcon}
          resizeMode="cover"
          source={require("../../../../../assets/tablergolf.png")}
        />
        <Text style={styles.holeValue}>{data.hole}</Text>
      </View>
      <View style={[styles.holePar, styles.holeSpaceBlock]}>
        <Image
          style={styles.circumparking1Icon}
          resizeMode="cover"
          source={require("../../../../../assets/circumparking1.png")}
        />
        <Text style={[styles.parValue, styles.valueFlexBox]}>{data.par}</Text>
      </View>
      <View style={[styles.holeDistance, styles.holeSpaceBlock]}>
        <Image
          style={styles.circumparking1Icon}
          resizeMode="cover"
          source={require("../../../../../assets/arcticonsruler.png")}
        />
        <Text style={[styles.distanceValue, styles.valueFlexBox]}>{data.distance}</Text>
      </View>
      <View style={[styles.holeRating, styles.holeSpaceBlock]}>
        <Image
          style={styles.iconParkranking}
          resizeMode="cover"
          source={require("../../../../../assets/iconparkranking.png")}
        />
        <Text style={[styles.text, styles.valueFlexBox]}>{data.HoleRating.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  holeSpaceBlock: {
    marginLeft: 20,
    flexDirection: "row",
  },
  valueFlexBox: {
    textAlign: "left",
    alignItems: "center",
    display: "flex",
    color: Color.black,
    fontFamily: FontFamily.interRegular,
  },
  tablergolfIcon: {
    height: 53,
    width: 53,
    overflow: "hidden",
  },
  holeValue: {
    textAlign: "center",
    justifyContent: "center",
    opacity: 0.75,
    alignItems: "center",
    display: "flex",
    color: Color.black,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_17xl,
    height: 53,
    width: 53,
  },
  holeNumber: {
    backgroundColor: Color.white,
    width: 106,
    flexDirection: "row",
  },
  circumparking1Icon: {
    maxHeight: "100%",
    width: 53,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  parValue: {
    width: 23,
    fontSize: FontSize.size_17xl,
    textAlign: "left",
    height: 53,
  },
  holePar: {
    width: 76,
  },
  distanceValue: {
    width: 90,
    fontSize: FontSize.size_17xl,
    textAlign: "left",
    height: 53,
  },
  holeDistance: {
    width: 143,
  },
  iconParkranking: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  text: {
    fontSize: FontSize.size_5xl,
    marginLeft: 1,
    flex: 1,
    alignSelf: "stretch",
  },
  holeRating: {
    paddingHorizontal: Padding.p_81xl,
    paddingVertical: 0,
    flex: 1,
    overflow: "hidden",
  },
  holeInformation: {
    flexWrap: "wrap",
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_2xl,
    marginTop: 10,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
});

export default HoleInformation;
