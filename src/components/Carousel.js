import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CafeCard from './CafeCard';

export default function Carousel({ items }) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        return (
          <CafeCard
            title={item.name}
            imgUri={item.imgUri}
            avgRating={item.avgRating}
            totalReviews={item.totalReviews}
          />
        );
      }}
      keyExtractor={(item) => item.name}
      horizontal
      style={{ paddingBottom: 10 }}
    />
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  // Card: PropTypes.element.isRequired,
};
