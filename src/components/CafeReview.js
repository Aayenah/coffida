/* eslint-disable import/named */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Card, Rating, Image } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import * as RootNavigation from '../utility/RootNavigation';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import LikeButton from './LikeButton';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import {
  likeReview,
  unlikeReview,
  getPhotoForReview,
} from '../utility/ReviewHelpers';
import AddPhotoButton from './AddPhotoButton';
import DeleteReviewIcon from './DeleteReviewIcon';
import UpdateReviewButton from './UpdateReviewButton';
import ReviewPlaceholder from './ReviewPlaceholder';

export default function CafeReview({ cafe, review }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [likes, setLikes] = useState(review.likes);

  async function checkReviewOwnedByUser() {
    const id = await getUserIdFromStorage();
    const user = await getUserInfo(id);

    if (user) {
      const isReviewOwned = user.reviews.some(
        (r) => r.review.review_id === review.review_id,
      );
      setIsOwned(isReviewOwned);
    }
  }

  async function checkLikedReviews() {
    const id = await getUserIdFromStorage();
    const user = await getUserInfo(id);
    if (user) {
      const reviewLiked = user.liked_reviews.some(
        (r) => r.review.review_id === review.review_id,
      );
      setIsLiked(reviewLiked);
    }
  }

  async function checkReviewPhoto() {
    const data = await getPhotoForReview(cafe.location_id, review.review_id);
    setImageData(data);
  }

  async function onLike() {
    if (isLiked) {
      const res = await unlikeReview(cafe.location_id, review.review_id);
      if (res.ok) {
        setLikes(likes - 1);
        setIsLiked(false);
        Toast.show('Review unliked');
      } else {
        Toast.show(`Failed to unlike review - ${res?.status}`);
      }
    } else {
      const res = await likeReview(cafe.location_id, review.review_id);
      if (res.ok) {
        setLikes(likes + 1);
        setIsLiked(true);
        Toast.show('Review liked');
      } else {
        Toast.show(`Failed to like review - ${res?.status}`);
      }
    }
  }

  function onOpenCamera() {
    RootNavigation.navigate('Camera View', {
      cafe,
      review,
    });
  }

  function onViewPhoto() {
    RootNavigation.navigate('Photo View', {
      url: imageData.url,
      cafe,
      review,
      isOwned,
    });
  }

  function onUpdateReview() {
    RootNavigation.navigate('Update Review Screen', {
      cafe,
      review,
    });
  }

  async function onDeleteReview() {
    RootNavigation.navigate('Delete Review Screen', { cafe, review });
  }

  useEffect(() => {
    async function prepareComponent() {
      setLoading(true);
      await checkReviewOwnedByUser();
      await checkLikedReviews();
      await checkReviewPhoto();
      setLoading(false);
    }
    prepareComponent();
  }, []);

  if (loading) {
    return <ReviewPlaceholder />;
  }

  return (
    <TouchableWithoutFeedback accessibilityLabel="Card that displays review details">
      <Card containerStyle={styles.card}>
        <View style={styles.user_row}>
          <Text style={styles.menu}>{`Review ID: ${review.review_id}`}</Text>
          {isOwned && (
            <View style={styles.controls}>
              <AddPhotoButton openCameraView={onOpenCamera} />
              <DeleteReviewIcon onDelete={onDeleteReview} />
              <UpdateReviewButton onUpdate={onUpdateReview} />
            </View>
          )}
        </View>
        <View style={styles.body}>
          <View style={styles.stars_row}>
            <Rating
              readonly
              fractions={0}
              startingValue={review.overall_rating}
              type="custom"
              ratingColor={colors.primary}
              ratingTextColor={colors.secondary}
              ratingBackgroundColor="silver"
              tintColor="#f7f7f7"
              imageSize={24}
              style={styles.stars}
            />
          </View>
          <View style={styles.aspect_row}>
            <AspectRating aspect="Quality" rating={review.quality_rating} />
            <AspectRating aspect="Price" rating={review.price_rating} />
            <AspectRating
              aspect="Cleanliness"
              rating={review.clenliness_rating}
            />
          </View>
          <Card.Divider style={{ marginBottom: 0 }} />
          {review.photoUrl !== 'none' && (
            <View style={styles.image_row}>
              <Image
                source={{ uri: review.photoUrl }}
                style={{ width: '100%', height: 200 }}
                resizeMode="contain"
                onPress={onViewPhoto}
                accessibilityLabel="Review photo"
                accessibilityHint="Open photo in a new screen"
                accessibilityRole="imagebutton"
              />
            </View>
          )}
          <Card.Divider />
          <Text style={styles.review_text}>{review.review_body}</Text>
          <Card.Divider style={{ marginBottom: 0 }} />
          <View style={styles.footer}>
            <LikeButton isLiked={isLiked} onLike={onLike} />
            <Text style={styles.likes}>{`${likes} likes`}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

CafeReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 20,
    paddingTop: 2,
    // borderColor: 'lightgrey',
    backgroundColor: '#f7f7f7',
  },
  user_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
    marginLeft: 'auto',
  },
  body: {
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  image_row: {
    // backgroundColor: 'floralwhite',
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
    paddingVertical: 5,
  },
  likes: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.bodyText,
    marginLeft: 10,
  },
});
