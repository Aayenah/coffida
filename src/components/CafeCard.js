import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import { getDistance, convertDistance } from 'geolib';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import AverageStars from './AverageStars';
import Distance from './Distance';
import AspectRating from './AspectRating';
import FavouritesButton from './FavouritesButton';
import * as RootNavigation from '../utility/RootNavigation';
// eslint-disable-next-line import/named
import { fetchCafeInfo } from '../utility/CafeHelpers';

const windowWidth = Dimensions.get('window').width;
export default function CafeCard({ cafe }) {
  function goToCafeScreen() {
    RootNavigation.navigate('Cafe Screen', {
      cafe,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={goToCafeScreen}>
      <Card containerStyle={styles.card}>
        <ImageBackground source={{ uri: cafe.photo_path }} style={styles.img}>
          <FavouritesButton />
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.cafeName}>{cafe.location_name}</Text>
            {/* <Text style={styles.cafeName}>{cafeId}</Text> */}
            {/* {distance > 0 ? <Distance miles={distance} /> : <Text>-</Text>} */}
            <Distance miles={0} />
          </View>
          <AverageStars
            avg={cafe.avg_overall_rating}
            total={cafe.location_reviews.length}
          />
          <View style={styles.aspectRow}>
            <AspectRating aspect="Quality" rating={cafe.avg_quality_rating} />
            <AspectRating aspect="Price" rating={cafe.avg_price_rating} />
            <AspectRating
              aspect="Cleanliness"
              rating={cafe.avg_clenliness_rating}
            />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

CafeCard.propTypes = {
  // cafeId: PropTypes.number.isRequired,
  // cafeName: PropTypes.string.isRequired,
  // photo: PropTypes.string.isRequired,
  // avgOverallRating: PropTypes.number.isRequired,
  // avgQualityRating: PropTypes.number.isRequired,
  // avgPriceRating: PropTypes.number.isRequired,
  // avgCleanlinessRating: PropTypes.number.isRequired,
  // reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  // totalReviews: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.8,
    height: 240,
    padding: 0,
    margin: 0,
    marginRight: 5,
  },
  img: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 150,
  },
  favIcon: {
    margin: 10,
  },
  cafeName: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aspectRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});
