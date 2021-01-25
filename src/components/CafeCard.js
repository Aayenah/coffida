import React from 'react';
// eslint-disable-next-line object-curly-newline
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import AverageStars from './AverageStars';
import Distance from './Distance';
import AspectRating from './AspectRating';
import FavouritesButton from './FavouritesButton';

const windowWidth = Dimensions.get('window').width;
export default function CafeCard({
  title,
  photo,
  avgOverallRating,
  avgQualityRating,
  avgPriceRating,
  avgCleanlinessRating,
  totalReviews,
}) {
  return (
    <Card containerStyle={styles.card}>
      <ImageBackground source={{ uri: photo }} style={styles.img}>
        <FavouritesButton />
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Distance miles={2.1} />
        </View>
        <AverageStars avg={avgOverallRating} total={totalReviews} />
        <View style={styles.aspectRow}>
          <AspectRating aspect="Quality" rating={avgQualityRating} />
          <AspectRating aspect="Price" rating={avgPriceRating} />
          <AspectRating aspect="Cleanliness" rating={avgCleanlinessRating} />
        </View>
      </View>
    </Card>
  );
}

CafeCard.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  avgOverallRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  avgQualityRating: PropTypes.number.isRequired,
  avgPriceRating: PropTypes.number.isRequired,
  avgCleanlinessRating: PropTypes.number.isRequired,
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
  title: {
    fontFamily: 'Roboto',
    fontSize: 16,
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
