import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CafeScreen from '../screens/CafeScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import AddReviewScreen from '../screens/AddReviewScreen';
import UpdateReviewScreen from '../screens/UpdateReviewScreen';
import DeleteReviewScreen from '../screens/DeleteReviewScreen';
import MapScreen from '../screens/MapScreen';
import CameraView from '../components/CameraView';
import PhotoView from '../components/PhotoView';

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
      <Stack.Screen
        name="Reviews Screen"
        component={ReviewsScreen}
        options={{ title: 'All Reviews' }}
      />
      <Stack.Screen
        name="Camera View"
        component={CameraView}
        options={{ title: 'Camera', headerShown: false }}
      />
      <Stack.Screen
        name="Add Review Screen"
        component={AddReviewScreen}
        options={{ title: 'Add Review' }}
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
      <Stack.Screen
        name="Map Screen"
        component={MapScreen}
        options={{ title: 'Map View' }}
      />
    </Stack.Navigator>
  );
}
