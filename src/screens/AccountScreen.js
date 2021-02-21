import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';
import LoadingScreen from './LoadingScreen';

export default function AccountScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    getUser().then((value) => {
      setUser(value);
      setLoading(false);
    });
  }, []);

  if (loading) {
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
