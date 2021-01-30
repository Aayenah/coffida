import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../config/colors';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
});
