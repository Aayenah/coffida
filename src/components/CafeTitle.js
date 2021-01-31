import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function CafeTitle({ title, town }) {
  const townString = `  -  ${town}`;
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.town}>{townString}</Text>
    </View>
  );
}

CafeTitle.propTypes = {
  title: PropTypes.string.isRequired,
  town: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  town: {
    fontSize: 16,
    fontFamily: 'Roboto',
    // fontWeight: 'bold',
    color: colors.bodyText,
  },
});
