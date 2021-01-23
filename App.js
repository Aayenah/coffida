import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  // SafeAreaView,
  // ScrollView,
  // View,
  // Text,
  // StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import AccountScreen from './screens/AccountScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        <Tab.Screen name="FavouritesScreen" component={FavouritesScreen} />
        <Tab.Screen name="AccountScreen" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  footer: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
