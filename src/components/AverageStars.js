import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default function AverageStars({ avg, total }) {
  const info = ` ${avg.toFixed(1)} (${total})`;

  return (
    <View style={styles.container}>
      <Icon name="star" type="font-awesome-5" color="#6F2A3B" size={12} solid />
      <Text style={styles.rating}>{info}</Text>
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
    fontSize: 12,
    fontFamily: 'Roboto',
  },
});
