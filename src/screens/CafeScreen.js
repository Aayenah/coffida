/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
import { fetchCafeInfo, fetchCafeList } from '../utility/CafeHelpers';

export default function CafeScreen({ route }) {
  const { cafe } = route.params;
  const [currentCafe, setCurrentCafe] = useState(cafe);

  async function updateCafeInfo() {
    // ? reason for getting all cafes instead of one is because
    // ? the single cafe has different attributes for review objects
    // ? and is also missing user_id attribute
    const list = await fetchCafeList();
    const thisCafe = list.filter((loc) => loc.location_id === cafe.location_id);
    if (thisCafe) {
      setCurrentCafe(thisCafe[0]);
    }
  }

  useEffect(() => {
    updateCafeInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageHeader photoUri={currentCafe.photo_path} />
      <View style={styles.info}>
        <View style={styles.title_row}>
          <CafeTitle
            title={currentCafe.location_name}
            town={currentCafe.location_town}
          />
          <FavouritesButton />
        </View>
        <AverageStars
          avg={currentCafe.avg_overall_rating}
          total={currentCafe.location_reviews.length}
        />
        <Divider style={styles.divider} />
        <ReviewsSection cafe={currentCafe} />
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
