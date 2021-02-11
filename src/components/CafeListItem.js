/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import * as RootNavigation from '../utility/RootNavigation';
import AverageStars from './AverageStars';
import AspectRating from './AspectRating';
import FavouritesButton from './FavouritesButton';
import { addToFavourites, removeFromFavourites } from '../utility/CafeHelpers';
import { getUserIdFromStorage, getUserInfo } from '../utility/Authentication';

export default function CafeListItem({ cafe }) {
  const [isFav, setIsFav] = useState(false);

  function goToCafeScreen() {
    RootNavigation.navigate('Cafe Screen', {
      cafe,
    });
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
      await checkFavourites();
    }
    prepareComponent();
  }, []);

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

  return (
    <ListItem
      bottomDivider
      onPress={goToCafeScreen}
      containerStyle={styles.item}
    >
      <Avatar source={{ uri: cafe.photo_path }} containerStyle={styles.photo} />
      <ListItem.Content>
        <View style={styles.title_row}>
          <ListItem.Title style={styles.cafe_name}>
            {cafe.location_name}
          </ListItem.Title>
          <Text> - </Text>
          <Text style={styles.town}>{cafe.location_town}</Text>
          <View style={styles.fav_container}>
            <FavouritesButton isFav={isFav} onFav={onFav} size={12} />
          </View>
        </View>
        <AverageStars
          avg={cafe.avg_overall_rating}
          total={cafe.location_reviews.length}
        />
        <Divider />
        <View style={styles.aspect_row}>
          <AspectRating aspect="Quality" rating={cafe.avg_quality_rating} />
          <AspectRating aspect="Price" rating={cafe.avg_price_rating} />
          <AspectRating
            aspect="Cleanliness"
            rating={cafe.avg_clenliness_rating}
          />
        </View>
      </ListItem.Content>
    </ListItem>
  );
}

CafeListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  photo: {
    width: 70,
    height: 70,
  },
  favIcon: {
    margin: 10,
  },
  fav_container: {
    marginLeft: 'auto',
  },
  cafe_name: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  title_row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  aspect_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
});
