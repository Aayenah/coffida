/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
// eslint-disable-next-line
import { login } from '../utility/Authentication';
import * as RootNavigation from '../utility/RootNavigation';

export default function RegisterModal({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, []);

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
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result !== null) {
        navigation.goBack();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.log(`initiateLogin: ${err}`);
      setError('Unable to login. Please try again.');
    }
    setTimeout(() => setLoading(false), 2000);
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
        loading={loading}
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