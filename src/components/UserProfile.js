/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';

export default function UserProfile() {
  const { signIn, getUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [firstNameDisabled, setFirstNameDisabled] = useState(true);
  const [lastNameDisabled, setLastNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);

  useEffect(() => {
    getUser().then((value) => {
      console.log('ACCOUNTSCREEN', value);
      setUser(value);
    });
  }, []);

  async function initiateSave() {
    //
  }

  if (user === null) {
    return <Text>no user</Text>;
  }

  return (
    <View style={styles.container}>
      <Input
        label="First Name"
        defaultValue={user.first_name}
        disabled={firstNameDisabled}
        leftIcon={
          <Icon name="envelope" type="font-awesome-5" color="#424242" solid />
        }
        rightIcon={
          <Icon
            name="edit"
            type="font-awesome-5"
            color="#424242"
            solid
            onPress={() => setFirstNameDisabled(!firstNameDisabled)}
          />
        }
        onChangeText={(value) => setFirstName(value)}
      />
      <Input
        label="Last Name"
        defaultValue={user.last_name}
        disabled={lastNameDisabled}
        leftIcon={
          <Icon name="envelope" type="font-awesome-5" color="#424242" solid />
        }
        rightIcon={
          <Icon
            name="edit"
            type="font-awesome-5"
            color="#424242"
            solid
            onPress={() => setLastNameDisabled(!lastNameDisabled)}
          />
        }
        onChangeText={(value) => setLastName(value)}
      />
      <Input
        label="Email"
        defaultValue={user.email}
        disabled={emailDisabled}
        leftIcon={
          <Icon name="envelope" type="font-awesome-5" color="#424242" solid />
        }
        rightIcon={
          <Icon
            name="edit"
            type="font-awesome-5"
            color="#424242"
            solid
            onPress={() => setEmailDisabled(!emailDisabled)}
          />
        }
        onChangeText={(value) => setEmail(value)}
      />
      <Input
        label="Password"
        // secureTextEntry
        disabled={passwordDisabled}
        leftIcon={
          <Icon name="lock" type="font-awesome-5" color="#424242" solid />
        }
        rightIcon={
          <Icon
            name="edit"
            type="font-awesome-5"
            color="#424242"
            solid
            onPress={() => setPasswordDisabled(!passwordDisabled)}
          />
        }
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title="Save Profile"
        raised
        containerStyle={styles.button_container}
        buttonStyle={styles.button}
        loading={loading}
        onPress={initiateSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    width: '100%',
  },
  or: {
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
