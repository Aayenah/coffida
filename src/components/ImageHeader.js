import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function ImageHeader({ photoUri }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: photoUri }} style={styles.img} />
      </View>
    </View>
  );
}

ImageHeader.propTypes = {
  photoUri: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
