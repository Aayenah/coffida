import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function AspectRating({ aspect, rating }) {
  let info = '';

  if (Number.isNaN(rating) || !rating) {
    info = '-';
  } else {
    info = rating < 1 ? '-' : `${rating.toFixed(1)}`;
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.aspect}
        accessibilityLabel="Aspect label"
        accessibilityRole="text"
      >
        {aspect}
      </Text>
      <Text
        style={styles.rating}
        accessibilityLabel="Aspect rating"
        accessibilityRole="text"
      >
        {info}
      </Text>
    </View>
  );
}

AspectRating.propTypes = {
  aspect: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

AspectRating.defaultProps = {
  rating: '-',
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
