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
import { Icon } from 'react-native-elements';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import AccountScreen from './src/screens/AccountScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer style={styles.body}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'mug-hot';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Favourites') {
              iconName = 'heart';
            } else if (route.name === 'Account') {
              iconName = 'user';
            }

            return (
              <Icon
                name={iconName}
                type="font-awesome-5"
                color={color}
                size={20}
                solid
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#6F2A3B',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 11 },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
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
