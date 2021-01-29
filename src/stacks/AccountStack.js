import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="Account Screen">
      <Stack.Screen
        name="Account Screen"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login Modal"
        component={LoginModal}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Register Modal"
        component={RegisterModal}
        options={{ title: 'Register' }}
      />
    </Stack.Navigator>
  );
}
