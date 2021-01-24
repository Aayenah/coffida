import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import AverageStars from './AverageStars';
import Distance from './Distance';
import FavouritesButton from './FavouritesButton';

export default function CafeCard({ title, imgUri, avgRating, totalReviews }) {
  return (
    <Card containerStyle={styles.card}>
      <ImageBackground source={{ uri: imgUri }} style={styles.img}>
        <FavouritesButton />
      </ImageBackground>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <AverageStars avg={avgRating} total={totalReviews} />
        <Distance miles={2.1} />
      </View>
    </Card>
  );
}

CafeCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgUri: PropTypes.string.isRequired,
  avgRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: 230,
    height: 215,
    padding: 0,
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
    // backgroundColor: 'burlywood',
  },
  body: {
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
