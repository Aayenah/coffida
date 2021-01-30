import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function CafeTitle({ title }) {
  return <Text style={styles.text}>{title}</Text>;
}

CafeTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
