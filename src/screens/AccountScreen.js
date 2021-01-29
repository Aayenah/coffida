import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';
// eslint-disable-next-line import/named
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import { AuthContext } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';

export default function AccountScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    getUser().then((value) => {
      // console.log('ACCOUNTSCREEN', value);
      setUser(value);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      <UserProfile />
      <Text style={styles.or}>Logged in</Text>
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
