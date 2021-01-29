import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
// import { logout } from '../utility/Authentication';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginButton() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <Button
      title="  Logout"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      icon={
        <Icon name="sign-out-alt" type="font-awesome-5" color="white" solid />
      }
      onPress={signOut}
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
