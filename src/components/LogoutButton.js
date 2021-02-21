import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../config/colors';
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
      accessibilityHint="Logout from application and navigate to authentication screen"
      accessibilityRole="button"
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
