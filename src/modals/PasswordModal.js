/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import colors from '../config/colors';
import { AuthContext } from '../contexts/AuthContext';
import { isPasswordValid } from '../utility/InputValidator';
import { updateUser } from '../utility/Authentication';

export default function PasswordModal({ navigation }) {
  const { getUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setError('');
    setMessage('');
    getUser().then((value) => {
      console.log('PASSWORD MODAL: ', value);
      setFirstName(value.first_name);
      setLastName(value.last_name);
      setEmail(value.email);
    });
  }, []);

  async function initiatePasswordSave() {
    setError('');
    setMessage('');
    if (password1 !== password2) return setError('Passwords do not match');
    if (!isPasswordValid(password1)) return setError('Invalid password');

    setButtonLoading(true);
    const result = await updateUser(firstName, lastName, email, password1);
    if (result === 'success') {
      setMessage('Successfully updated password');
      navigation.goBack();
    }
    setButtonLoading(false);
    return console.log('PASSWORD SAVE: ', result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{message}</Text>
      <Text style={styles.error}>{error}</Text>
      <Input
        label="New Password"
        secureTextEntry
        leftIcon={
          <Icon name="lock" type="font-awesome-5" color="#424242" solid />
        }
        onChangeText={(value) => setPassword1(value)}
      />
      <Input
        label="New Password Again"
        secureTextEntry
        leftIcon={
          <Icon name="lock" type="font-awesome-5" color="#424242" solid />
        }
        onChangeText={(value) => setPassword2(value)}
      />
      <Button
        title="  Save"
        raised
        containerStyle={styles.button_container}
        buttonStyle={styles.save}
        loading={buttonLoading}
        onPress={initiatePasswordSave}
        icon={
          <Icon
            name="save"
            type="font-awesome-5"
            size={20}
            color="white"
            solid
          />
        }
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
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  msg: {
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  save: {
    backgroundColor: colors.primary,
  },
  button_container: {
    width: 80,
  },
});
