import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <LoginButton />
      <Text style={styles.or}>Or</Text>
      <RegisterButton />
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
  or: {
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
