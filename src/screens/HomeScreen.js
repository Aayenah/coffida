import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native-elements';
import { getDistance, convertDistance } from 'geolib';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from '../components/Carousel';
import colors from '../config/colors';
import { config, permissions } from '../config/location';
import {
  MIN_OVERALL,
  MIN_QUALITY,
  MIN_PRICE,
  MIN_DISTANCE,
} from '../config/ratings';

export default function HomeScreen() {
  const [cafes, setCafes] = useState([]);
  // const [nearby, setNearby] = useState([]);
  const [currentCoord, setCurrentCoord] = useState(null);
  const [loading, setLoading] = useState(false);
  const topRatedCafes = cafes.filter(
    (c) => c.avg_overall_rating >= MIN_OVERALL,
  );
  const highQualityCafes = cafes.filter(
    (c) => c.avg_quality_rating >= MIN_QUALITY,
  );
  const bestPricesCafes = cafes.filter((c) => c.avg_price_rating >= MIN_PRICE);
  // let nearbyCafes = cafes.filter((c) => c.distance_from_user < 100);

  function fetchCafes() {
    setLoading(true);
    const options = {
      headers: {
        'X-Authorization': '6829e05b0b0925585665ae15952551d8',
      },
    };

    fetch('http://10.0.2.2:3333/api/1.0.0/find', options)
      .then((res) => res.json())
      .then((data) => {
        setCafes(data);
        setLoading(false);
      })
      .catch((err) => {
        // TODO: show alert to use
        console.log(err);
      });
  }

  async function saveCoordinates() {
    try {
      await AsyncStorage.setItem('@lat', currentCoord.lat);
      await AsyncStorage.setItem('@lng', currentCoord.lng);
    } catch (err) {
      console.log(`ERROR saving location: ${err}`);
    }
  }

  function startUpdatingLocation() {
    RNLocation.subscribeToLocationUpdates((location) => {
      const coord = {
        lat: location[0].latitude.toString(),
        lng: location[0].longitude.toString(),
      };
      setCurrentCoord(coord);
      // saveCoordinates();
    });
  }

  useEffect(() => {
    setLoading(true);
    RNLocation.configure(config);
    RNLocation.requestPermission(permissions).then((granted) => {
      if (granted) {
        startUpdatingLocation();
      } else {
        // setError('LOCATION_DENIED');
      }
    });
    // fetchCafes();
  }, []);

  useEffect(() => {
    if (currentCoord !== null) {
      saveCoordinates();
      cafes.forEach((c) => {
        const cafeCoord = { latitude: c.latitude, longitude: c.longitude };
        const miles = convertDistance(
          getDistance(currentCoord, cafeCoord),
          'mi',
        );
        // eslint-disable-next-line no-param-reassign
        c.distance_from_user = miles.toFixed(1);
      });
      // nearbyCafes = cafes.filter((c) => c.distance_from_user < 100);
      setLoading(false);
    }
  }, [currentCoord]);

  // if (loading) {
  //   return (
  //     <View style={styles.spinner}>
  //       <ActivityIndicator size="large" color={colors.primary} />
  //     </View>
  //   );
  // }

  return (
    <ScrollView>
      <View style={styles.container}>
        {currentCoord === null ? (
          <View>
            <Carousel title="Top Rated" items={topRatedCafes} />
            <Carousel title="High Quality" items={highQualityCafes} />
            <Carousel title="Best Prices" items={bestPricesCafes} />
          </View>
        ) : (
          <View>
            <Carousel title="Nearby Cafes" items={cafes} />
            <Carousel title="Top Rated" items={topRatedCafes} />
            <Carousel title="High Quality" items={highQualityCafes} />
            <Carousel title="Best Prices" items={bestPricesCafes} />
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
    paddingTop: 50,
    backgroundColor: 'white',
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
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
