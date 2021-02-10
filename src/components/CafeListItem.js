import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import AverageStars from './AverageStars';
import AspectRating from './AspectRating';
import FavouritesButton from './FavouritesButton';
import * as RootNavigation from '../utility/RootNavigation';

export default function CafeListItem({ cafe }) {
  function goToCafeScreen() {
    RootNavigation.navigate('Cafe Screen', {
      cafe,
    });
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
  item: {
    // alignItems: 'flex-start',
    // paddingLeft: ,
  },
  photo: {
    width: 70,
    height: 70,
  },
  favIcon: {
    margin: 10,
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
  },
  aspect_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
});
