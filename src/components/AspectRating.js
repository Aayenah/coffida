import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function AspectRating({ aspect, rating }) {
  const info = rating < 1 ? '-' : `${rating.toFixed(1)}`;
  return (
    <View style={styles.container}>
      <Text style={styles.aspect}>{aspect}</Text>
      <Text style={styles.rating}>{info}</Text>
    </View>
  );
}

AspectRating.propTypes = {
  aspect: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'cadetblue',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  aspect: {
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
