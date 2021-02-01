/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import ImageHeader from '../components/ImageHeader';
import CafeTitle from '../components/CafeTitle';
import AverageStars from '../components/AverageStars';
import Distance from '../components/Distance';
import AspectRating from '../components/AspectRating';
import FavouritesButton from '../components/FavouritesButton';
import colors from '../config/colors';
import ReviewsSection from '../components/ReviewsSection';

export default function CafeScreen({ route }) {
  const { cafe } = route.params;
  return (
    <ScrollView style={styles.container}>
      <ImageHeader photoUri={cafe.photo_path} />
      <View style={styles.info}>
        <View style={styles.title_row}>
          <CafeTitle title={cafe.location_name} town={cafe.location_town} />
          <FavouritesButton />
        </View>
        <AverageStars
          avg={cafe.avg_overall_rating}
          total={cafe.location_reviews.length}
        />
        <Divider style={styles.divider} />

        {/* <Divider style={styles.divider} /> */}
        <ReviewsSection cafe={cafe} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
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
  town: {
    marginBottom: 25,
  },
  divider: {
    marginVertical: 20,
    color: colors.bodyText,
  },
  aspect_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    // backgroundColor: colors.accent,
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
