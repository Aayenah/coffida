/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, Divider, Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import CafeReview from './CafeReview';
import AspectRatingColumn from './AspectRatingColumn';
import * as RootNavigation from '../utility/RootNavigation';

export default function ReviewsSection({ cafe }) {
  let totalReviews = '';
  if (cafe.location_reviews.length === 0) {
    totalReviews = 'No Reviews';
  } else if (cafe.location_reviews.length === 1) {
    totalReviews = `${cafe.location_reviews.length} Review`;
  } else {
    totalReviews = `${cafe.location_reviews.length} Reviews`;
  }

  function goToAllReviews() {
    RootNavigation.navigate('Reviews Screen', { cafe });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <Text style={styles.subtitle}>Overall</Text>
      <Text style={styles.avg_number}>{cafe.avg_overall_rating}</Text>
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
      />
      {/* <View style={styles.reviews}>{reviewsList}</View> */}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'pink',
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
});
