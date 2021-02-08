/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CafeReview from '../components/CafeReview';
import LoadingScreen from './LoadingScreen';
import { fetchCafeList, fetchCafeInfo } from '../utility/CafeHelpers';

export default function ReviewsScreen({ route }) {
  const { cafe } = route.params;
  const [currentCafe, setCurrentCafe] = useState(cafe);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function updateCafeInfo() {
      setLoading(true);
      // const list = await fetchCafeList();
      // const thisCafe = list.filter(
      //   (loc) => loc.location_id === cafe.location_id,
      // );
      const thisCafe = await fetchCafeInfo(cafe.location_id);
      // console.log(thisCafe);
      if (thisCafe) {
        setCurrentCafe(thisCafe);
        setLoading(false);
      }
    }
    updateCafeInfo();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const reviewsList = currentCafe.location_reviews.map((r) => (
    <CafeReview key={r.review_id} cafe={currentCafe} review={r} />
  ));

  if (!reviewsList) {
    return <Text>No Reviews</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>{reviewsList}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  list: {
    marginBottom: 20,
  },
});
