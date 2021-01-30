/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
// eslint-disable-next-line
// import { login } from '../utility/Authentication';
import * as RootNavigation from '../utility/RootNavigation';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginModal({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, getUser } = useContext(AuthContext);

  async function initiateLogin() {
    if (email.length < 1) {
      setError('Please enter your email');
      return;
    }
    if (password.length < 1) {
      setError('Please enter your password');
      return;
    }
    setError('');
    setButtonLoading(true);
    try {
      const result = await signIn(email, password);
      console.log(`initiateLogin result: ${result}`);
      if (!result) {
        setButtonLoading(false);
        setError('Invalid credentials');
      }
    } catch (err) {
      // setLoading(false);
      console.log(`initiateLogin: ${err}`);
      setError('Unable to login. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <Input
        placeholder="Email"
        leftIcon={
          <Icon name="envelope" type="font-awesome-5" color="#424242" solid />
        }
        onChangeText={(value) => setEmail(value)}
      />
      <Input
        placeholder="Password"
        // secureTextEntry
        leftIcon={
          <Icon name="lock" type="font-awesome-5" color="#424242" solid />
        }
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title="Login"
        raised
        containerStyle={styles.button_container}
        buttonStyle={styles.button}
        loading={buttonLoading}
        onPress={initiateLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  text: {
    color: 'black',
  },
  button_container: {
    width: '80%',
  },
  button: {
    backgroundColor: colors.primary,
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
  },
});
