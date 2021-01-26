/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';

export default function CafeScreen({ route }) {
  return (
    <View>
      <Text>{route.params.cafeName}</Text>
    </View>
  );
}
