/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ImageHeader from '../components/ImageHeader';
import CafeTitle from '../components/CafeTitle';
import AverageStars from '../components/AverageStars';
import Distance from '../components/Distance';
import AspectRating from '../components/AspectRating';
import FavouritesButton from '../components/FavouritesButton';
import colors from '../config/colors';

export default function CafeScreen({ route }) {
  return (
    <ScrollView style={styles.container}>
      <ImageHeader photoUri={route.params.photo} />
      <View style={styles.info}>
        <View style={styles.title_row}>
          <CafeTitle title={route.params.cafeName} />
          <FavouritesButton />
        </View>
        <AverageStars
          avg={route.params.avgOverallRating}
          total={route.params.totalReviews}
        />
        <View style={styles.aspect_row}>
          <AspectRating
            aspect="Quality"
            rating={route.params.avgQualityRating}
          />
          <AspectRating aspect="Price" rating={route.params.avgPriceRating} />
          <AspectRating
            aspect="Cleanliness"
            rating={route.params.avgCleanlinessRating}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  info: {
    paddingHorizontal: 10,
  },
  title_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: 10,
  },
  aspect_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    backgroundColor: colors.accent,
    paddingVertical: 2,
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
