import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
import * as RootNavigation from '../utility/RootNavigation';

export default function LoginButton() {
  function openLoginModal() {
    RootNavigation.navigate('Login Modal');
  }

  return (
    <Button
      title="  Login"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      icon={
        <Icon name="sign-in-alt" type="font-awesome-5" color="white" solid />
      }
      onPress={openLoginModal}
    />
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: '80%',
  },
  button: {
    backgroundColor: colors.primary,
  },
  text: {
    color: 'white',
  },
});
