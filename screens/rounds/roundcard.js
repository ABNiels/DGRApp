import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const RoundCard = ({ course, layout, numHoles, numLayoutHoles, date, players, par }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    return (
        <View>
        <TouchableOpacity key={date} onPress={toggleModal}>
            <View style={styles.card}>
                <Text style={styles.course}>{`${course} - ${layout} thru ${numHoles}/${numLayoutHoles}`}</Text>
                <Text style={styles.date}>{date}</Text>

                <View style={styles.playerScoresContainer}>
                {players.map((player, index) => (
                    <View key={index} style={styles.playerScore}>
                    <Text style={styles.player}>{player.playerName}</Text>
                    <Text style={styles.score}>{`${player.strokes > par ? `+` : ''}${player.strokes - par} (${player.strokes})`}</Text>
                    </View>
                ))}
                </View>
            </View>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">

            <TouchableOpacity onPress={toggleModal}>
                <Text>Close Modal</Text>
            </TouchableOpacity>
        </Modal>
    </View>
    )
};

const styles = StyleSheet.create({
  card: {
    width: 500,
    backgroundColor: '#fff',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 8,
    marginVertical: 4,
  },
  course: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  player: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
    marginRight: "10%",
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008000',
    marginTop: 2,
  },
  playerScoresContainer: {
    flexDirection: 'row', // Arrange items horizontally
    marginTop: 8, // Adjust as needed
  },
});


export default RoundCard;
