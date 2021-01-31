import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors, { primary } from '../config/colors';
import AspectRating from './AspectRating';
import LikeButton from './LikeButton';

export default function CafeReview({ review }) {
  return (
    <View style={styles.container}>
      <Rating
        readonly
        fractions={1}
        startingValue={review.review_overallrating}
        type="custom"
        ratingColor={colors.primary}
        ratingTextColor={colors.secondary}
        ratingBackgroundColor="silver"
        tintColor="white"
        imageSize={16}
        style={styles.stars}
      />
      <View style={styles.aspect_row}>
        <AspectRating aspect="Quality" rating={review.review_qualityrating} />
        <AspectRating aspect="Price" rating={review.review_pricerating} />
        <AspectRating
          aspect="Cleanliness"
          rating={review.review_clenlinessrating}
        />
      </View>
      <Text style={styles.body}>{review.review_body}</Text>
      <LikeButton />
    </View>
  );
}

CafeReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomColor: colors.bodyText,
    borderBottomWidth: 0.6,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  stars: {
    marginBottom: 10,
  },
  aspect_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
    // backgroundColor: colors.accent,
  },
  body: {
    width: '100%',
    color: colors.bodyText,
    fontSize: 14,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 20,
  },
});
