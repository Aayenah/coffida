import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function AverageStars({ avg, total }) {
  // const average = avg < 1 ? ' -' : ` ${avg.toFixed(1)}`;
  const count = ` (${total})`;

  let avgString = '';

  if (Number.isNaN(avg) || !avg) {
    avgString = ' No Reviews';
  } else {
    avgString = avg < 1 ? 'No Reviews' : `${avg.toFixed(1)}`;
  }

  return (
    <View style={styles.container}>
      <Icon
        name="star"
        type="font-awesome-5"
        color={colors.primary}
        size={14}
        solid
        accessible
        accessibilityLabel="Star icon"
        accessibilityHint="Star icon"
        accessibilityRole="none"
      />
      <View style={styles.row}>
        <Text
          style={styles.rating}
          accessible
          accessibilityLabel="Average stars"
          accessibilityHint="Average star rating"
          accessibilityRole="text"
        >
          {avgString}
        </Text>
        <Text
          style={styles.total}
          accessible
          accessibilityLabel="Total reviews"
          accessibilityHint="Total count for number of reviews this cafe has"
          accessibilityRole="text"
        >
          {count}
        </Text>
      </View>
    </View>
  );
}

AverageStars.propTypes = {
  avg: PropTypes.number,
  total: PropTypes.number,
};

AverageStars.defaultProps = {
  avg: '-',
  total: 0,
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'cadetblue',
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Roboto',
    // fontWeight: 'bold',
    color: colors.bodyText,
  },
  total: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: colors.bodyText,
  },
  row: {
    flexDirection: 'row',
  },
});
