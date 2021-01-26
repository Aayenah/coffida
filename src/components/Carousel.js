import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import CafeCard from './CafeCard';

export default function Carousel({ title, items }) {
  useEffect(() => {
    console.log(title);
    if (title === 'Nearby Cafes') {
      items.sort((a, b) => {
        if (a.avg_overall_rating < b.avg_overall_rating) {
          return -1;
        }
        if (a.avg_overall_rating > b.avg_overall_rating) {
          return 1;
        }
        return 0;
      });
    }
  }, []);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return (
            <CafeCard
              key={item.location_id}
              cafeId={item.location_id}
              cafeName={item.location_name}
              photo="https://picsum.photos/2000/1000"
              avgOverallRating={item.avg_overall_rating}
              avgQualityRating={item.avg_overall_rating}
              avgPriceRating={item.avg_price_rating}
              avgCleanlinessRating={item.avg_clenliness_rating} // typo from API
              totalReviews={item.location_reviews.length}
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

Carousel.propTypes = {
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
});
