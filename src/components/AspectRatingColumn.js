import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, Divider } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import LikeButton from './LikeButton';

export default function AspectRatingColumn({ cafe }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Quality</Text>
        <Rating
          readonly
          fractions={1}
          startingValue={cafe.avg_quality_rating}
          type="star"
          imageSize={14}
          style={styles.stars}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price</Text>
        <Rating
          readonly
          fractions={1}
          startingValue={cafe.avg_price_rating}
          type="star"
          imageSize={14}
          style={styles.stars}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cleanliness</Text>
        <Rating
          readonly
          fractions={1}
          startingValue={cafe.avg_cleanliness_rating}
          type="star"
          imageSize={14}
          style={styles.stars}
        />
      </View>
    </View>
  );
}

AspectRatingColumn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '45%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: colors.bodyText,
  },
  stars: {
    // marginLeft: 10,
  },
  stars_row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
