/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CafeReview from '../components/CafeReview';
import LoadingScreen from './LoadingScreen';
import { fetchCafeInfo } from '../utility/CafeHelpers';
import { getPhotoForReview } from '../utility/ReviewHelpers';

export default function ReviewsScreen({ route }) {
  const { cafe } = route.params;
  const [currentCafe, setCurrentCafe] = useState(cafe);
  const isFocused = useIsFocused();

  async function updateCafeData() {
    const thisCafe = await fetchCafeInfo(cafe.location_id);
    if (thisCafe) {
      for (const r of thisCafe.location_reviews) {
        const res = await getPhotoForReview(thisCafe.location_id, r.review_id);
        if (res.ok) {
          r.photoUrl = res.url;
        } else {
          r.photoUrl = 'none';
        }
      }
      setCurrentCafe(thisCafe);
    }
  }

  useEffect(() => {
    async function prepareComponent() {
      await updateCafeData();
    }
    prepareComponent();
  }, [isFocused]);

  if (!currentCafe) {
    return <LoadingScreen />;
  }

  const sortedList = currentCafe.location_reviews.sort((a, b) => {
    // sort by review id descending
    if (a.review_id < b.review_id) return 1;
    if (a.review_id > b.review_id) return -1;
    return 0;
  });

  const reviewsList = sortedList.map((r) => (
    <CafeReview
      key={r.review_id}
      cafe={currentCafe}
      review={r}
      returnScreen="Cafe Screen"
    />
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
