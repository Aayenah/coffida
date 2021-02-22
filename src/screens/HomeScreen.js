/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel from '../components/Carousel';
import colors from '../config/colors';
import {
  MIN_OVERALL,
  MIN_QUALITY,
  MIN_PRICE,
  MIN_DISTANCE,
} from '../config/ratings';
import LoadingScreen from './LoadingScreen';
import { getDistanceInMiles } from '../utility/GeolocationHelpers';
import { fetchCafeList } from '../utility/CafeHelpers';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const topRatedCafes = cafes.filter(
    (c) => c.avg_overall_rating >= MIN_OVERALL,
  );
  const highQualityCafes = cafes.filter(
    (c) => c.avg_quality_rating >= MIN_QUALITY,
  );
  const bestPricesCafes = cafes.filter((c) => c.avg_price_rating >= MIN_PRICE);

  useEffect(() => {
    async function prepareData() {
      setLoading(true);
      const cafeList = await fetchCafeList();

      for (const c of cafeList) {
        const cafeCoords = {
          latitude: c.latitude,
          longitude: c.longitude,
        };
        c.distance = await getDistanceInMiles(cafeCoords);
      }

      setCafes(cafeList);
      setLoading(false);
    }
    prepareData();
  }, []);

  const nearbyCafes = cafes.filter((c) => c.distance < MIN_DISTANCE);

  const sortedNearbyCafes = nearbyCafes.sort((a, b) => {
    //* sort by distance descending
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View>
          {/* <Carousel title="All Cafes" items={cafes} parentFocused={isFocused} /> */}
          {nearbyCafes.length > 0 && (
            <Carousel
              title="Nearest Cafes"
              items={sortedNearbyCafes}
              parentFocused={isFocused}
            />
          )}
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
    paddingTop: 20,
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
