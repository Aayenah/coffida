/* eslint-disable import/named */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Card, Rating, Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as RootNavigation from '../utility/RootNavigation';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import AddPhotoButton from './AddPhotoButton';
import DeleteReviewIcon from './DeleteReviewIcon';
import UpdateReviewButton from './UpdateReviewButton';
import ReviewPlaceholder from './ReviewPlaceholder';

export default function MyReview({ cafe, review, returnScreen }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [loading, setLoading] = useState(false);
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

  function onOpenCamera() {
    RootNavigation.navigate('Camera View', {
      cafe,
      review,
      returnScreen,
    });
  }

  function onViewPhoto() {
    RootNavigation.navigate('Photo View', {
      url: review.photoUrl,
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

  // async function onDeleteReview() {
  //   Alert.alert('Warning', 'Are you sure you want to delete this review?', [
  //     {
  //       text: 'No',
  //     },
  //     {
  //       text: 'Yes',
  //       onPress: async () => {
  //         const res = await deleteReview(cafe.location_id, review.review_id);
  //         if (res.ok) {
  //           // Toast.show('Review deleted');
  //           RootNavigation.navigate('Delete Reviews Screen');
  //           Alert.alert('Review deleted');
  //         } else {
  //           Alert.alert('Error', `Failed to delete review - ${res?.status}`);
  //         }
  //       },
  //     },
  //   ]);
  // }

  useEffect(() => {
    async function prepareComponent() {
      setLoading(true);
      await checkReviewOwnedByUser();
      await checkLikedReviews();
      // await checkReviewPhoto();
      setLoading(false);
    }
    prepareComponent();
  }, []);

  if (loading) {
    return <ReviewPlaceholder />;
  }

  return (
    <TouchableWithoutFeedback>
      <Card containerStyle={styles.card}>
        <View style={styles.user_row}>
          <Text style={styles.cafe_name}>{cafe.location_name}</Text>
          <Text style={styles.cafe_name}>{review.review_id}</Text>
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
              tintColor="white"
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
              />
            </View>
          )}
          <Card.Divider />
          <Text style={styles.review_text}>{review.review_body}</Text>
          <Card.Divider style={{ marginBottom: 0 }} />
          <View style={styles.footer}>
            {/* <LikeButton isLiked={isLiked} onLike={onLike} /> */}
            <Text style={styles.likes}>{`${likes} likes`}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

MyReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  review: PropTypes.object.isRequired,
  returnScreen: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 20,
    paddingTop: 2,
    borderColor: 'lightgrey',
  },
  user_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  cafe_name: {
    fontSize: 16,
    fontWeight: 'bold',
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
