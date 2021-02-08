/* eslint-disable import/named */
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
import LoadingScreen from './LoadingScreen';
import { getUserTokenFromStorage } from '../utility/Authentication';
import { fetchCafeList } from '../utility/CafeHelpers';

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

  useEffect(() => {
    async function prepareData() {
      setLoading(true);
      const cafeList = await fetchCafeList();
      setCafes(cafeList);
      setLoading(false);
    }
    prepareData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View>
          <Carousel title="All Cafes" items={cafes} />
          {topRatedCafes.length > 0 && (
            <Carousel title="Top Rated" items={topRatedCafes} />
          )}
          {highQualityCafes.length > 0 && (
            <Carousel title="High Quality" items={highQualityCafes} />
          )}
          {bestPricesCafes.length > 0 && (
            <Carousel title="Best Prices" items={bestPricesCafes} />
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
