/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRatingColumn from './AspectRatingColumn';
import * as RootNavigation from '../utility/RootNavigation';
import AddReviewButton from './AddReviewButton';

export default function ReviewsSection({ cafe }) {
  let totalReviews = '';
  if (cafe.location_reviews.length === 0) {
    totalReviews = 'No Reviews';
  } else if (cafe.location_reviews.length === 1) {
    totalReviews = `${cafe.location_reviews.length} Review`;
  } else {
    totalReviews = `${cafe.location_reviews.length} Reviews`;
  }

  let ratingString = '';

  if (Number.isNaN(cafe.avg_overall_rating) || !cafe.avg_overall_rating) {
    ratingString = 'No Reviews';
  } else {
    // eslint-disable-next-line operator-linebreak
    ratingString =
      cafe.avg_overall_rating < 1
        ? 'No Reviews'
        : `${cafe.avg_overall_rating.toFixed(1)}`;
  }

  function goToAllReviews() {
    RootNavigation.navigate('Reviews Screen', { cafe });
  }

  function onAdd() {
    RootNavigation.navigate('Add Review Screen', { cafe });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <Text style={styles.subtitle}>Overall</Text>
      <Text style={styles.avg_number}>{ratingString}</Text>
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

      <AspectRatingColumn cafe={cafe} />
      <Button
        title="See all reviews"
        type="outline"
        containerStyle={styles.button_container}
        buttonStyle={styles.button}
        titleStyle={styles.button}
        iconRight
        icon={
          <Icon
            name="chevron-right"
            type="font-awesome-5"
            color={colors.secondary}
            size={14}
            solid
          />
        }
        onPress={goToAllReviews}
        accessibilityHint="Navigate to all reviews screen"
        accessibilityRole="button"
      />
      <View style={styles.add_row}>
        <AddReviewButton onAdd={onAdd} />
      </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  avg_number: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  stars: {
    marginRight: 10,
  },
  stars_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  aspect_row: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: 'dodgerblue',
    paddingVertical: 2,
  },
  button_container: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    color: colors.secondary,
    borderColor: colors.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add_row: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
});
