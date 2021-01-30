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
      type="clear"
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      titleStyle={styles.button}
      onPress={signOut}
    />
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
  },
  button: {
    color: colors.secondary,
  },
  text: {
    color: 'white',
  },
});
