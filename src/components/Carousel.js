import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import CafeCard from './CafeCard';

export default function Carousel({ title, items, parentFocused }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return <CafeCard cafe={item} parentFocused={parentFocused} />;
        }}
        keyExtractor={(item) => item.location_id.toString()}
        horizontal
        style={{ marginBottom: 20, paddingBottom: 5 }}
      />
    </View>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  parentFocused: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'black',
    marginBottom: 5,
  },
});
