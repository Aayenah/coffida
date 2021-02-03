import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function AspectRating({ aspect, rating }) {
  const info = rating < 1 ? '-' : `${rating}`;
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
    color: colors.bodyText,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
  },
});
