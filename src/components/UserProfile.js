/* eslint-disable import/named */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import { isEmailValid, isNameValid } from '../utility/InputValidator';
import { updateUser } from '../utility/Authentication';
import LogoutButton from './LogoutButton';
import colors from '../config/colors';
import * as RootNavigation from '../utility/RootNavigation';

export default function UserProfile() {
  const { getUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setError('');
    setMessage('');
    getUser().then((value) => {
      setUser(value);
      setFirstName(value.first_name);
      setLastName(value.last_name);
      setEmail(value.email);
    });
  }, []);

  async function initiateSave() {
    setMessage('');
    setError('');
    if (!isNameValid(firstName)) return setError('Invalid first name');
    if (!isNameValid(lastName)) return setError('Invalid last name');
    if (!isEmailValid(email)) return setError('Invalid email');
    setButtonLoading(true);
    const result = await updateUser(firstName, lastName, email, null);
    if (result === 'success') {
      setMessage('Successfully updated profile');
    }
    setButtonLoading(false);
    return console.log(result);
  }

  async function resetProfile() {
    const currentUser = await getUser();
    if (currentUser) {
      setFirstName(currentUser.first_name);
      setLastName(currentUser.last_name);
      setEmail(currentUser.email);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{message}</Text>
      <Text style={styles.error}>{error}</Text>
      <Input
        label="First Name"
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
        label="Last Name"
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
        label="Email"
        defaultValue={email}
        leftIcon={
          <Icon name="envelope" type="font-awesome-5" color="#424242" solid />
        }
        onChangeText={(value) => setEmail(value)}
      />
      <Text style={styles.error}>{error}</Text>
      <View style={styles.saveRow}>
        <Button
          title="  Save"
          raised
          containerStyle={styles.button_container}
          buttonStyle={styles.save}
          onPress={initiateSave}
          loading={buttonLoading}
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
        <Button
          title="Reset"
          raised
          containerStyle={styles.button_container}
          buttonStyle={styles.reset}
          onPress={resetProfile}
        />
      </View>
      <Button
        title="Change Password"
        type="clear"
        containerStyle={styles.pwd_container}
        titleStyle={styles.pwd}
        onPress={() => RootNavigation.navigate('Password Modal')}
      />
      <LogoutButton />
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
    marginVertical: 10,
  },
  saveRow: {
    flexDirection: 'row',
  },
  save: {
    backgroundColor: colors.primary,
  },
  button_container: {
    marginHorizontal: 10,
  },
  reset: {
    backgroundColor: colors.secondary,
  },
  pwd_container: {
    marginTop: 30,
  },
  pwd: {
    color: colors.secondary,
  },
});
