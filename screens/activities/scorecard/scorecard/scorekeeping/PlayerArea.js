import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PlayerInfo from "./PlayerInfo";
import HoleScore from "./HoleScore";
import PlayerRatings from "./PlayerRatings";

const elementAddition = (arr1, arr2) => {
  return [arr1[0] + arr2[0], arr1[1] + arr2[1], arr1[2] + arr2[2]];
}
const mapFilter = (item, playerIndex) => {
  if (item.PlayerInfo[playerIndex].holeScore > 0) {
    return [item.PlayerInfo[playerIndex].holeScore, item.PlayerInfo[playerIndex].expectedScore, item.HoleInfo.par];
  } else {
    return [0, 0, 0];
  }
}
const PlayerArea = ({ data, hole, callbacks }) => {
  const renderItem = (item) => {
    let scoreString = "";
    let playerName = item.item.name;
    // sum all of  item.index of PlayerInfo's holeScore
    if (data) {
      const playerSum = data.map(elem => mapFilter(elem, item.index))
      .reduce((accumulator, currentValue) => elementAddition(accumulator, currentValue), [0, 0, 0]); // hole score, expected score, par
    
      scoreString = `${playerSum[0]} (${playerSum[0]-playerSum[2]>0?'+':''}${playerSum[0]-playerSum[2]}) (${playerSum[0]-playerSum[1]-playerSum[2]>0?'+':''}${(playerSum[0]-playerSum[1]-playerSum[2]).toFixed(2)})`;
      
      const playerExpectedStrokes = data.map(elem => elem.PlayerInfo[item.index].expectedScore)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      playerName = `${playerName} (${playerExpectedStrokes.toFixed(2)})`;
    }
    return (
      <View>
        {/* Display PlayerInfo and HoleScore next to each other */}
        <View style={styles.horizontalContainer}>
          <PlayerInfo 
          playerName = {playerName}
          score = {scoreString}/>
          <HoleScore 
          score={item.item.holeScore}
          index={item.index}
          callbacks={callbacks}/>
        </View>
        {/* Display PlayerRatings beneath */}
        <PlayerRatings 
        playerRating = {item.item.rating}
        playerHoleRating = {item.item.holeRating}
        playerExpected = {item.item.expectedScore}/>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.playerArea}
      data={data[hole].PlayerInfo}
      renderItem={renderItem}
      contentContainerStyle={styles.playerAreaFlatListContent}
      horizontal={false}
    />
  );
};

const styles = StyleSheet.create({
  playerAreaFlatListContent: {
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  playerArea: {
    width: 359,
    flex: 1,
    maxWidth: 359,
  },
  horizontalContainer: {
    flexDirection: "row",
  },
});

export default PlayerArea;
