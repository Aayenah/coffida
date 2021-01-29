import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const [visible, setVisible] = useState(true);

  function toggleOverlay() {
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.text}>Hello from Overlay</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '80%',
    width: '95%',
    padding: 10,
    backgroundColor: 'dodgerblue',
  },
  text: {
    color: 'black',
  },
});
