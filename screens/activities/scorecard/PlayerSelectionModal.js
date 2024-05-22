import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, TouchableHighlight } from 'react-native';

const PlayerSelectionModal = ({ isVisible, data, callbacks }) => {
    const renderItem = ({ item }) => {

        var touchProps = {
            activeOpacity: 1,
            underlayColor: 'blue',
            onPress: () => {
                callbacks.handlePlayerSelection({item});
            }
          };
        return (
        <TouchableHighlight
        {...touchProps}
        >
        <View style={styles.player}>
          <Text style={styles.playerName}>{item.PlayerName}</Text>
          <Text style={styles.playerRating}>Rating: {item.PlayerRating}</Text>
        </View>
        </TouchableHighlight>
      )
    };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={callbacks.backup}
    >
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={data => data.PlayerID.toString()}
      renderItem={renderItem}
    />
    {/* Finalize button */}
    <TouchableOpacity  onPress={callbacks.finalize}>
      <Text style={styles.playerName}>Finalize</Text>
    </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    player: {
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      marginVertical: 10,
      padding: 20,
      width: 300,
    },
    playerName: {
      fontSize: 24,
      marginBottom: 5,
      color: 'black',
    },
    playerRating: {
      fontSize: 14,
      color: '#888',
    },
    btnNormal: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
      },
    btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
    }
  });
export default PlayerSelectionModal;
