/* eslint-disable import/named */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Card, Avatar, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import LikeButton from './LikeButton';
import { getUserInfo } from '../utility/Authentication';

export default function CafeReview({ review }) {
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState('??');
  const fullName = `${user?.first_name} ${user?.last_name}`;
  const reviewCount = user ? user.reviews.length : 0;
  const reviewCountString = `${reviewCount} Reviews`;
  const likesString = `${review.likes} likes`;

  async function prepareUserInfo() {
    const data = await getUserInfo(review.review_user_id);
    setUser(data);
    if (data) {
      setInitials(`${data.first_name.charAt(0)}${data.last_name.charAt(0)}`);
    } else {
      setInitials('??');
    }
  }

  useEffect(() => {
    prepareUserInfo();
  }, []);

  return (
    <TouchableWithoutFeedback>
      <Card containerStyle={styles.card}>
        <View style={styles.user_row}>
          <Avatar
            size="medium"
            title={initials}
            rounded
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            containerStyle={styles.avatar}
          />
          <Text style={styles.full_name}>{fullName}</Text>
          <Text style={styles.review_count}>{reviewCountString}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.stars_row}>
            <Rating
              readonly
              fractions={0}
              startingValue={review.review_overallrating}
              type="custom"
              ratingColor={colors.primary}
              ratingTextColor={colors.secondary}
              ratingBackgroundColor="silver"
              tintColor="white"
              imageSize={24}
              style={styles.stars}
            />
            {/* <Text style={styles.review_count}>{totalReviews}</Text> */}
          </View>
          <View style={styles.aspect_row}>
            <AspectRating
              aspect="Quality"
              rating={review.review_qualityrating}
            />
            <AspectRating aspect="Price" rating={review.review_pricerating} />
            <AspectRating
              aspect="Cleanliness"
              rating={review.review_clenlinessrating}
            />
          </View>
          <Card.Divider />
          <Text style={styles.review_text}>{review.review_body}</Text>
          <Card.Divider style={{ marginBottom: 0 }} />
          <View style={styles.footer}>
            <LikeButton />
            <Text style={styles.likes}>{likesString}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

CafeReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    // height: 240,
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 10,
    paddingTop: 2,
  },
  user_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  full_name: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginLeft: 10,
    color: colors.bodyText,
  },
  review_count: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginLeft: 'auto',
    color: colors.bodyText,
  },
  body: {
    // height: '100%',
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  stars: {
    marginRight: 10,
  },
  stars_row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  aspect_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  review_text: {
    fontFamily: 'Roboto',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 20,
    color: colors.bodyText,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.bodyText,
  },
});
