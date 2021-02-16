/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
import * as RootNavigation from '../utility/RootNavigation';

export default function LoginButton() {
  function openLoginModal() {
    RootNavigation.navigate('Login Modal');
  }

  return (
    <Button
      title="  View On Map"
      type="clear"
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      titleStyle={styles.button}
      icon={
        <Icon
          name="map-marker-alt"
          type="font-awesome-5"
          color={colors.secondary}
          solid
        />
      }
      onPress={() => console.log('map')}
    />
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: '50%',
  },
  button: {
    color: colors.secondary,
  },
  text: {
    color: 'white',
  },
});
