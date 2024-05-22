import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import CourseSelectionModal from './scorecard/CourseSelectionModal.js';
import PlayerSelectionModal from './scorecard/PlayerSelectionModal.js';
import PuttingModal from './putting/PuttingModal.js';
import DistanceModal from './distance/DistanceModal.js';
import { DBObject, DBQueries } from '../../src/sqlite';
import Scorecard from './scorecard/scorecard/ScorecardModal';
import {
  calcExpectedScore,
  calcExpectedStrokes
} from "../../src/rating.js";

const ActivityPage = () => {
  /* App Data */
  const [CourseSelectionModalVisible, setCourseSelectionModalVisible] = useState(false);
  const [selectPlayerModalVisible, setPlayerSelectionModalVisible] = useState(false);
  const [ScorecardModalVisible, setScorecardModalVisible] = useState(false);
  const [puttingModalVisible, setPuttingModalVisible] = useState(false);
  const [distanceModalVisible, setDistanceModalVisible] = useState(false);
  const [availableRounds, setAvailableCourses] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState([]);

  /* Modal Data */
  const [selectedHole, setSelectedHole] = useState(0);
  const [scorecardDetails, setScorecardDetails] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  
  const startNewRound = () => {
    /* On selection of "Scorecard", get available courses and players and open modal */
    DBObject.transaction((tx) => {
      tx.executeSql(DBQueries.CoursesQuery, [],
        (_, { rows: { _array } }) => {
          setAvailableCourses(_array);
      });

      tx.executeSql(DBQueries.PlayersQuery, [],
        (_, { rows: { _array } }) => {
          setAvailablePlayers(_array);
      });

    })
      
    setCourseSelectionModalVisible(true);
  }

  const handlePlayerSelection = (player) => {
    /* On selection of player add/remove player from selection */

    // if player is already selected, remove them
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== player));
    }
    else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  }

  const handleCourseSelection = (course) => {
    /* On selection of course - set course, clear players, open player selection modal */
    setSelectedCourse(course);
    setSelectedPlayers([]);
    setPlayerSelectionModalVisible(true);
  }

  const finalizeRoundOptions = () => {
    /* On selection of "Finalize Round" - open scorecard modal and generate all rating info needed */
    setPlayerSelectionModalVisible(false);
    setCourseSelectionModalVisible(false);
    setScorecardModalVisible(true);

    DBObject.transaction((tx) => {
      tx.executeSql(DBQueries.HoleInfoQuery, [selectedCourse.LayoutNum],
        (_, { rows: { _array } }) => {
          const rows = _array;
          console.log(rows)
          const processedData = rows.map(input => {
            const holeInfo = {
              hole: input.hole,
              HoleRating: input.HoleRating,
              par: input.par,
              distance: input.distance
            };
          
            const playerInfo = [];
            for (let i = 1; input[`Player${i}Name`]; i++) {
              const playerName = input[`Player${i}Name`];
              const playerRating = input[`Player${i}Rating`];
              const playerHoleRating = input[`Player${i}HoleRating`];
              const holeScore = 0;
              const expectedScore = calcExpectedStrokes(calcExpectedScore(playerRating, playerHoleRating, holeInfo.HoleRating));
          
              playerInfo.push({
                name: playerName,
                rating: playerRating,
                holeRating: playerHoleRating,
                holeScore: holeScore,
                expectedScore: expectedScore
              });
            }
          
            return {
              HoleInfo: holeInfo,
              PlayerInfo: playerInfo
            };
          });
          setScorecardDetails(processedData);
          console.log(processedData)
        }
      )
    })
  }

  const handleScoreUpdateDelta = (player, delta) => {
    /* On +/- for a player's score. */
    setScorecardDetails((prevScorecard) => {
      // Make a copy of the previous scorecard
      const newScorecard = [...prevScorecard];
      
      // Update the specific player's hole score
      if (
        newScorecard[selectedHole].PlayerInfo[player].holeScore === 0 &&
        delta > 0
      ) {
        newScorecard[selectedHole].PlayerInfo[player].holeScore =
          newScorecard[selectedHole].HoleInfo.par;
      } else if (
        newScorecard[selectedHole].PlayerInfo[player].holeScore >= -delta
      ) {
        newScorecard[selectedHole].PlayerInfo[player].holeScore += delta;
      }
  
      return newScorecard;
    });
  };

  const handleHoleUpdateDelta = (delta) => {
    /* On +/- for a hole navigation. */
    if (selectedHole + delta >= 0 && selectedHole + delta < scorecardDetails.length) {
      setSelectedHole(selectedHole + delta);
    }
  }

  const handleHoleUpdateStatic = (hole) => {
    /* On specific hole navigation. */
    setSelectedHole(hole);
  }

  const CourseSelectionCallbacks = {
    handleCourseSelection: handleCourseSelection,
    backup: () => setCourseSelectionModalVisible(false),
  }
  const PlayerSelectionCallbacks = {
    handlePlayerSelection: handlePlayerSelection,
    finalize: finalizeRoundOptions,
    backup: () => setPlayerSelectionModalVisible(false),
  }
  const ScorecardCallbacks = {
    updateScores: setScorecardDetails,
    updateHoleDelta: handleHoleUpdateDelta,
    updateHoleStatic: handleHoleUpdateStatic,
    updateScoreDelta: handleScoreUpdateDelta,
    backup: () => setScorecardModalVisible(false),

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, styles.scorecard]}
        onPress={startNewRound}
      >
        <Text>Scorecard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.putting]}
        onPress={() => setPuttingModalVisible(true)}
      >
        <Text>Putting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.distance]}
        onPress={() => setDistanceModalVisible(true)}
      >
        <Text>Distance</Text>
      </TouchableOpacity>

      <CourseSelectionModal
        isVisible={CourseSelectionModalVisible}
        data={availableRounds}
        callbacks={CourseSelectionCallbacks}
      />

      <PuttingModal
        isVisible={puttingModalVisible}
        closeModal={() => setPuttingModalVisible(false)}
      />

      <DistanceModal
        isVisible={distanceModalVisible}
        closeModal={() => setDistanceModalVisible(false)}
      />

      <PlayerSelectionModal
        isVisible={selectPlayerModalVisible}
        data={availablePlayers}
        callbacks={PlayerSelectionCallbacks}
      />


      {scorecardDetails && (
        <Scorecard 
          isVisible={ScorecardModalVisible} 
          data={scorecardDetails}
          hole={selectedHole}
          callbacks={ScorecardCallbacks} />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  putting: {
    backgroundColor: '#6e925d',
  },
  scorecard: {
    backgroundColor: '#e67e22',
  },
  distance: {
    backgroundColor: '#3498db',
  }
});

export default ActivityPage;
