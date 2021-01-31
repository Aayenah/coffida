import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import LikeButton from './LikeButton';

export default function AspectRatingColumn({ review }) {
  return (
    <View style={styles.container}>
      <Text>Quality</Text>
      <Text>Price</Text>
      <Text>Cleanliness</Text>
    </View>
  );
}

AspectRatingColumn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // review: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomColor: colors.bodyText,
    borderBottomWidth: 0.6,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  stars: {
    marginBottom: 10,
  },
  aspect_row: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  body: {
    width: '100%',
    color: colors.bodyText,
    fontSize: 14,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 20,
  },
});
