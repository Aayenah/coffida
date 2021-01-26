import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Image } from 'react-native-elements';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from '../components/Carousel';
import colors from '../config/colors';

const headerImg = require('../images/nero.jpg');

const permsOptions = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
  },
};

export default function HomeScreen() {
  const [cafes, setCafes] = useState([]);
  const [currentCoord, setCurrentCoord] = useState(null);
  const [error, setError] = useState('');

  function fetchCafes() {
    const options = {
      headers: {
        'X-Authorization': '24a9fb8b83552ec344937deb4c3e4ced',
      },
    };

    fetch('http://10.0.2.2:3333/api/1.0.0/find', options)
      .then((res) => res.json())
      .then((data) => {
        setCafes(data);
      })
      .catch((err) => {
        // TODO: show alert to use
        console.log(err);
      });
  }

  function startUpdatingLocation() {
    // console.log('starting to update location...');
    RNLocation.subscribeToLocationUpdates((loc) => {
      // console.log(loc[0]);
      const coord = {
        lat: loc[0].latitude.toString(),
        lng: loc[0].longitude.toString(),
      };
      setCurrentCoord(coord);
    });
  }

  useEffect(() => {
    async function resetCoordinates() {
      try {
        await AsyncStorage.removeItem('@lat');
        await AsyncStorage.removeItem('@lng');
      } catch (err) {
        console.log(`cannot remove coords ${err}`);
      }
    }
    resetCoordinates();
    RNLocation.configure({
      distanceFilter: 5.0, // meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
    });
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then((granted) => {
      // console.log(`granted: ${granted}`);
      if (granted) {
        startUpdatingLocation();
      } else {
        setError('LOCATION_DENIED');
      }
    });
    fetchCafes();
  }, []);

  useEffect(() => {
    async function saveCoordinates() {
      try {
        await AsyncStorage.setItem('@lat', currentCoord.lat);
        await AsyncStorage.setItem('@lng', currentCoord.lng);
      } catch (err) {
        console.log(`ERROR saving location: ${err}`);
        setError('SAVE_ERROR');
      }
    }
    saveCoordinates();
  }, [currentCoord]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={headerImg} style={styles.img} />
      </View>
      <View style={styles.container}>
        {currentCoord === null ? (
          <View>
            <Carousel title="Top Rated" items={cafes} />
            <Carousel title="High Quality" items={cafes} />
            <Carousel title="Best Prices" items={cafes} />
          </View>
        ) : (
          <View>
            <Carousel title="Nearby Cafes" items={cafes} />
            <Carousel title="Top Rated" items={cafes} />
            <Carousel title="High Quality" items={cafes} />
            <Carousel title="Best Prices" items={cafes} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    // paddingTop: 50,
  },
  header: {
    height: 230,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    marginBottom: 20,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
