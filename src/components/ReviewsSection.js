import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import CafeReview from './CafeReview';

export default function ReviewsSection({ cafe }) {
  let totalReviews = '';
  if (cafe.location_reviews.length === 0) {
    totalReviews = 'No Reviews';
  } else if (cafe.location_reviews.length === 1) {
    totalReviews = `${cafe.location_reviews.length} Review`;
  } else {
    totalReviews = `${cafe.location_reviews.length} Reviews`;
  }

  const reviewsList = cafe.location_reviews.map((r) => (
    <CafeReview key={r.review_id} review={r} />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <View style={styles.stars_row}>
        <Rating
          readonly
          fractions={1}
          startingValue={cafe.avg_overall_rating}
          type="custom"
          ratingColor={colors.primary}
          ratingTextColor={colors.secondary}
          ratingBackgroundColor="silver"
          tintColor="white"
          imageSize={24}
          style={styles.stars}
        />
        <Text style={styles.review_count}>{totalReviews}</Text>
      </View>
      <View style={styles.reviews}>{reviewsList}</View>
    </View>
  );
}

ReviewsSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // backgroundColor: 'darkgreen',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    marginBottom: 5,
  },
  stars: {
    marginRight: 10,
  },
  stars_row: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  review_count: {
    color: colors.bodyText,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  reviews: {
    width: '100%',
    height: 400,
    marginBottom: 50,
  },
  divider: {
    marginVertical: 20,
    color: colors.bodyText,
    height: 2,
  },
});
