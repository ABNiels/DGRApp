import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, ScrollView } from 'react-native';

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.CourseName + ' ' + item.LayoutName}</Text>
  </View>
)

const CourseSelectionModal = ({ isVisible, data, callbacks }) => {
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible} onRequestClose={callbacks.backup}>

          <FlatList
            data={data}
            keyExtractor={(item) => item.CourseName + "_" + item.LayoutName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                callbacks.handleCourseSelection(item);
              }
              }>
              <View style={styles.course}>
                <Text style={styles.courseName}>{item.CourseName}</Text>
                <Text style={styles.layoutName}>Layout: {item.LayoutName}</Text>
                <Text style={styles.par}>Par: {item.cPar}</Text>
                <Text style={styles.rating}>Rating: {item.cRating}</Text>
                <Text style={styles.distance}>Total Distance: {item.TotalDistance}</Text>
              </View>
              </TouchableOpacity>
            )}
          />
    </Modal>
  );
};



const styles = StyleSheet.create({
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 15,
    paddingVertical: 5,
  },
  closeButtonText: {
    color: 'blue',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  course: {
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
  courseName: {
    color: "black",
    fontSize: 24,
    marginBottom: 5,
  },
  layoutName: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  par: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  rating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  distance: {
    fontSize: 14,
    color: '#007AFF',
  },
});

export default CourseSelectionModal;
