/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ProfilePage from './screens/profile';
import RoundsPage from './screens/rounds/rounds';
import ActivityPage from './screens/activities/activity';

const Tab = createBottomTabNavigator();

import { getDBConnection } from './src/sqlite';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  getDBConnection().then((db) => {
    db.transaction(tx => {
      tx.executeSql("PRAGMA table_info(SCORES);", [],
        (_, { rows: { _array } }) => {
          console.log(`Players: ${JSON.stringify(_array)}`);
        },
        (_, error) => {
          console.log(error)
          return true
        }
      );
    });
  })

  
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Profiles" component={ProfilePage} />
      <Tab.Screen name="Rounds" component={RoundsPage} />
      <Tab.Screen name="Activity" component={ActivityPage} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
