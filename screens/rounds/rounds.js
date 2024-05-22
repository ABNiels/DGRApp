import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { DBObject, DBQueries } from '../../src/sqlite';
import RoundCard from './roundcard';


const renderItem = ({ item }) => (
      <RoundCard
        course={item.courseName}
        layout={item.layoutName}
        numHoles={item.numHoles}
        numLayoutHoles={item.numLayoutHoles}
        date={item.Date}
        players={item.players}
        par={item.totalPar}
        onPress={() => openModal(item)}
      />
);

const RoundsPage = () => {
  const [rounds, setRounds] = useState([]);

  const [selectedRoundDetails, setSelectedRoundDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (details) => {
    setSelectedRoundDetails(details);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedRoundDetails(null);
    setIsModalVisible(false);
  };

  useEffect(() => {
    DBObject.transaction((tx) => {
      tx.executeSql(
        DBQueries.RoundsQuery,
        [],
        (tx, { rows: { _array } }) => {
          const rows = _array
          // Create an object to store the processed data
          const processedData = {};
      
          // Process each row in the query results
          rows.forEach(row => {
            const { CardNumber, courseName, layoutName, numHoles, numLayoutHoles, RoundNumber, Date, PlayerID, playerName, totalStrokes, totalPar } = row;
      
            // If the CardNumber entry doesn't exist, create it
            if (!processedData[CardNumber]) {
              processedData[CardNumber] = {
                courseName,
                layoutName,
                numHoles,
                numLayoutHoles,
                Date,
                RoundNumber,
                totalPar,
                players: []
              };
            }
      
            // Push player information into the players array
            processedData[CardNumber].players.push({
              playerName: playerName,
              strokes: totalStrokes,
            });
          });

          // reorder by date
          const sortedData = Object.values(processedData).sort((a, b) => {
            return new Date(b.Date) - new Date(a.Date);
          })

          setRounds(Object.values(sortedData));
        }
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={rounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.RoundNumber.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default RoundsPage;
