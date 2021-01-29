import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
import * as RootNavigation from '../utility/RootNavigation';

export default function RegisterButton() {
  function openRegisterModal() {
    RootNavigation.navigate('Register Modal');
  }

  return (
    <Button
      title="  Register"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      icon={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Icon
          name="user-plus"
          type="font-awesome-5"
          size={20}
          color="white"
          solid
        />
      }
      onPress={openRegisterModal}
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
