import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import PasswordModal from '../modals/PasswordModal';
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
        name="Password Modal"
        component={PasswordModal}
        options={{ title: 'Change Password' }}
      />
    </Stack.Navigator>
  );
}
