import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';
// eslint-disable-next-line import/named
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import { AuthContext } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';
import LoadingScreen from './LoadingScreen';
import colors from '../config/colors';

export default function AccountScreen() {
  const [user, setUser] = useState(null);
  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    getUser().then((value) => {
      // console.log('ACCOUNTSCREEN', value);
      setUser(value);
    });
  }, []);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <UserProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  or: {
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
