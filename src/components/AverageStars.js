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
      />
      <View style={styles.row}>
        <Text style={styles.rating}>{avgString}</Text>
        <Text style={styles.total}>{count}</Text>
      </View>
    </View>
  );
}

AverageStars.propTypes = {
  avg: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
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
