import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyReviewsScreen from '../screens/MyReviewsScreen';
import UpdateReviewScreen from '../screens/UpdateReviewScreen';
import DeleteReviewScreen from '../screens/DeleteReviewScreen';
import CameraView from '../components/CameraView';
import PhotoView from '../components/PhotoView';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="My Reviews Screen">
      <Stack.Screen
        name="My Reviews Screen"
        component={MyReviewsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Camera View"
        component={CameraView}
        options={{ title: 'Camera', headerShown: false }}
      />
      <Stack.Screen
        name="Update Review Screen"
        component={UpdateReviewScreen}
        options={{ title: 'Update Review' }}
      />
      <Stack.Screen
        name="Delete Review Screen"
        component={DeleteReviewScreen}
        options={{ title: 'Delete Review' }}
      />
      <Stack.Screen
        name="Photo View"
        component={PhotoView}
        options={{ title: 'Review Photo' }}
      />
    </Stack.Navigator>
  );
}
