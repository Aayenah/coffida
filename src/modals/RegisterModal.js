/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
// eslint-disable-next-line
import { register } from '../utility/Authentication';
import * as RootNavigation from '../utility/RootNavigation';
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from '../utility/InputValidator';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterModal({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    setError('');
    setMessage('');
    setButtonLoading(false);
  }, []);

  async function initiateRegister() {
    setMessage('');
    setError('');
    if (!isNameValid(firstName)) return setError('Invalid first name');
    if (!isNameValid(lastName)) return setError('Invalid last name');
    if (!isEmailValid(email)) return setError('Invalid email');
    if (!isPasswordValid(password)) return setError('Invalid password');

    setButtonLoading(true);
    const result = await register(firstName, lastName, email, password);
    console.log('register result: ', result);
    setButtonLoading(false);
    if (result) {
      const user = await signIn(email, password);
      console.log('user: ', user);
      if (!user) {
        setError('Invalid credentials');
      }
    }
    return console.log(result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <Input
        placeholder="First Name"
        defaultValue={firstName}
        leftIcon={
          <Icon
            name="user-circle"
            type="font-awesome-5"
            color="#424242"
            solid
          />
        }
        onChangeText={(value) => setFirstName(value)}
      />
      <Input
        placeholder="Last Name"
        defaultValue={lastName}
        leftIcon={
          <Icon
            name="user-circle"
            type="font-awesome-5"
            color="#424242"
            solid
          />
        }
        onChangeText={(value) => setLastName(value)}
      />
      <Input
        placeholder="Email"
        defaultValue={email}
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
        title="Register"
        raised
        containerStyle={styles.button_container}
        buttonStyle={styles.button}
        loading={buttonLoading}
        onPress={initiateRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
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
    margin: 10,
  },
});
