import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import CafeCard from './CafeCard';

export default function PhotoCarousel({ title, items }) {
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: 'https://picsum.photos/400/200' }}
              style={styles.photo}
            />
          );
        }}
        keyExtractor={(item) => item.location_id.toString()}
        horizontal
        style={{ marginBottom: 20, paddingBottom: 5 }}
      />
    </View>
  );
}

PhotoCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'black',
    marginBottom: 5,
  },
  photo: {
    width: 200,
    height: 100,
  },
});
