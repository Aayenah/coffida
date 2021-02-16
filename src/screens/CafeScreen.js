/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import ImageHeader from '../components/ImageHeader';
import CafeTitle from '../components/CafeTitle';
import AverageStars from '../components/AverageStars';
import FavouritesButton from '../components/FavouritesButton';
import ViewMapButton from '../components/ViewMapButton';
import colors from '../config/colors';
import ReviewsSection from '../components/ReviewsSection';
import {
  addToFavourites,
  removeFromFavourites,
  fetchCafeInfo,
} from '../utility/CafeHelpers';
import { getUserIdFromStorage, getUserInfo } from '../utility/Authentication';

export default function CafeScreen({ route }) {
  const { cafe } = route.params;
  const [currentCafe, setCurrentCafe] = useState(cafe);
  const [isFav, setIsFav] = useState(false);
  const isFocused = useIsFocused();

  async function updateCafeData() {
    const data = await fetchCafeInfo(cafe.location_id);
    setCurrentCafe(data);
  }

  async function onFav() {
    if (isFav) {
      const res = await removeFromFavourites(cafe.location_id);
      if (res.ok) {
        setIsFav(false);
        Toast.show('Removed from favourites');
      } else {
        Toast.show(`Failed to remove from favourites cafe - ${res?.status}`);
      }
    } else {
      const res = await addToFavourites(cafe.location_id);
      if (res.ok) {
        setIsFav(true);
        Toast.show('Added to favourites');
      } else {
        Toast.show(`Failed to add to favourites cafe - ${res?.status}`);
      }
    }
  }

  async function checkFavourites() {
    const id = await getUserIdFromStorage();
    const user = await getUserInfo(id);
    if (user) {
      const isFavourite = user.favourite_locations.some(
        (loc) => loc.location_id === cafe.location_id,
      );
      setIsFav(isFavourite);
    }
  }

  useEffect(() => {
    async function prepareComponent() {
      await updateCafeData();
      await checkFavourites();
    }
    prepareComponent();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <ImageHeader photoUri={currentCafe.photo_path} />
      <View style={styles.info}>
        <View style={styles.title_row}>
          <CafeTitle
            title={currentCafe.location_name}
            town={currentCafe.location_town}
          />
          <FavouritesButton isFav={isFav} onFav={onFav} size={20} />
        </View>
        <AverageStars
          avg={currentCafe.avg_overall_rating}
          total={currentCafe.location_reviews.length}
        />
        <View style={styles.map_button}>
          <ViewMapButton />
        </View>
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
  map_button: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginBottom: 20,
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
