/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Rating, Divider, Button, Icon } from 'react-native-elements';
import colors from '../config/colors';
import CafeReview from '../components/CafeReview';

export default function ReviewsScreen({ route }) {
  const { cafe } = route.params;

  const reviewsList = cafe.location_reviews.map((r) => (
    <CafeReview key={r.review_id} review={r} />
  ));

  return <ScrollView style={styles.container}>{reviewsList}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  avg_number: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  stars: {
    marginRight: 10,
  },
  stars_row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'pink',
    marginBottom: 20,
  },
  review_count: {
    color: colors.bodyText,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  reviews: {
    width: '100%',
    height: 400,
    marginBottom: 50,
  },
  divider: {
    marginVertical: 20,
    color: colors.bodyText,
    height: 2,
  },
  aspect_row: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: 'dodgerblue',
    paddingVertical: 2,
  },
  button_container: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    color: colors.secondary,
    borderColor: colors.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
