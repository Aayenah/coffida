import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="Auth Screen">
      <Stack.Screen
        name="Auth Screen"
        component={AuthScreen}
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
