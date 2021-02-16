/* eslint-disable import/named */
import React, { useEffect, useState, useContext } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import Carousel from '../components/Carousel';
import colors from '../config/colors';
import { config, permissions } from '../config/location';
import {
  MIN_OVERALL,
  MIN_QUALITY,
  MIN_PRICE,
  MIN_DISTANCE,
} from '../config/ratings';
import LoadingScreen from './LoadingScreen';
import { getLocationFromStorage } from '../utility/GeolocationHelpers';
import { fetchCafeList } from '../utility/CafeHelpers';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { findCoordinates } = useContext(AuthContext);
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

  useEffect(() => {
    async function prepareData() {
      setLoading(true);
      const cafeList = await fetchCafeList();
      setCafes(cafeList);
      setLoading(false);
    }
    prepareData();
  }, []);

  // useEffect(() => {
  //   async function prepareLocation() {
  //     const location = await findCoordinates();
  //     const loc = await getLocationFromStorage();
  //     console.log('loc', loc);
  //   }
  //   prepareLocation();
  // }, [isFocused]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View>
          <Carousel title="All Cafes" items={cafes} parentFocused={isFocused} />
          {topRatedCafes.length > 0 && (
            <Carousel
              title="Top Rated"
              items={topRatedCafes}
              parentFocused={isFocused}
            />
          )}
          {highQualityCafes.length > 0 && (
            <Carousel
              title="High Quality"
              items={highQualityCafes}
              parentFocused={isFocused}
            />
          )}
          {bestPricesCafes.length > 0 && (
            <Carousel
              title="Best Prices"
              items={bestPricesCafes}
              parentFocused={isFocused}
            />
          )}
        </View>
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
