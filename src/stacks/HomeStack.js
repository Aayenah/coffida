import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CafeScreen from '../screens/CafeScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home Screen">
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cafe Screen"
        component={CafeScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
