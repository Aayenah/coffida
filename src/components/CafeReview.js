/* eslint-disable import/named */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Card, Avatar, Rating, Image } from 'react-native-elements';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import LikeButton from './LikeButton';
import PhotoModal from './PhotoModal';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import {
  likeReview,
  unlikeReview,
  deleteReview,
  getPhotoForReview,
} from '../utility/ReviewHelpers';
import AddPhotoButton from './AddPhotoButton';
import DeleteReviewButton from './DeleteReviewButton';
import UpdateReviewButton from './UpdateReviewButton';
import * as RootNavigation from '../utility/RootNavigation';

export default function CafeReview({ review }) {
  const [reviewer, setReviewer] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [likes, setLikes] = useState(review.likes);
  const [initials, setInitials] = useState('-');
  const fullName = `${reviewer?.first_name} ${reviewer?.last_name}`;
  const reviewCount = reviewer ? reviewer.reviews.length : 0;
  const reviewCountString =
    reviewCount === 1
      ? `  (${reviewCount} Review)`
      : `  (${reviewCount} Reviews)`;

  async function getReviewOwner() {
    const data = await getUserInfo(review.review_user_id);
    setReviewer(data);
    if (data) {
      setInitials(
        `${data.first_name.charAt(0).toUpperCase()}${data.last_name
          .charAt(0)
          .toUpperCase()}`,
      );
    } else {
      setInitials('-');
    }
  }

  async function checkLikedReviews() {
    const id = await getUserIdFromStorage();
    const user = await getUserInfo(id);
    if (user) {
      const reviewLiked = user.liked_reviews.some(
        (r) => r.review.review_id === review.review_id,
      );
      // console.log(
      //   `reviewId: ${review.review_id} liked by ${user.email}? ${reviewLiked}`,
      // );
      setIsLiked(reviewLiked);
    }
  }

  async function checkOwnedReviews() {
    const id = await getUserIdFromStorage();
    const user = await getUserInfo(id);
    if (user) {
      const reviewOwned = user.reviews.some(
        (r) => r.review.review_id === review.review_id,
      );
      setIsOwned(reviewOwned);
    }
  }

  async function checkReviewPhoto() {
    const data = await getPhotoForReview(
      review.review_location_id,
      review.review_id,
    );
    setImageData(data);
  }

  async function onLike() {
    if (isLiked) {
      const res = await unlikeReview(
        review.review_location_id,
        review.review_id,
      );
      if (res.ok) {
        setLikes(likes - 1);
        setIsLiked(false);
      } else {
        console.log('failed to UNLIKE review ', res);
      }
    } else {
      const res = await likeReview(review.review_location_id, review.review_id);
      if (res.ok) {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        console.log('failed to LIKE review ', res);
      }
    }
  }

  function openCameraView() {
    RootNavigation.navigate('Camera View', { review });
  }

  function onUpdateReview() {
    RootNavigation.navigate('Update Review Screen', { review });
  }

  async function onDeleteReview() {
    Alert.alert('Warning', 'Are you sure you want to delete this review?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const res = await deleteReview(
            review.review_location_id,
            review.review_id,
          );
          if (res.ok) {
            RootNavigation.goBack();
          } else {
            Alert.alert('Error', `Failed to delete review - ${res?.status}`);
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function prepareComponent() {
      setLoading(true);
      await getReviewOwner();
      await checkLikedReviews();
      await checkOwnedReviews();
      await checkReviewPhoto();
      setLoading(false);
    }
    prepareComponent();
  }, []);

  if (loading) {
    return (
      <Card containerStyle={styles.placeholder_card}>
        <Placeholder
          Animation={Fade}
          Left={PlaceholderMedia}
          style={{ marginBottom: 30 }}
        >
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
        <Placeholder Animation={Fade}>
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback>
      <Card containerStyle={styles.card}>
        <View style={styles.user_row}>
          <Avatar
            size="medium"
            title={initials}
            rounded
            activeOpacity={0.7}
            containerStyle={styles.avatar}
          />
          <Text style={styles.full_name}>{fullName}</Text>
          <Text style={styles.review_count}>{reviewCountString}</Text>
          <Text style={styles.menu}>{review.review_id}</Text>
          {isOwned && (
            <View style={styles.controls}>
              <AddPhotoButton openCameraView={openCameraView} />
              <DeleteReviewButton onDelete={onDeleteReview} />
              <UpdateReviewButton onUpdate={onUpdateReview} />
            </View>
          )}
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
          {imageData?.ok && (
            <View>
              <Image
                source={{ uri: imageData.url }}
                style={{ width: '100%', height: 200 }}
                resizeMode="contain"
                onPress={() =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  RootNavigation.navigate('Photo View', {
                    url: imageData.url,
                    review,
                  })
                }
              />
            </View>
          )}
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
  review: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 10,
    paddingTop: 2,
  },
  placeholder_card: {
    width: '100%',
    height: 240,
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
    color: colors.bodyText,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    marginLeft: 'auto',
  },
  body: {
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
    paddingVertical: 5,
  },
  likes: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.bodyText,
    marginLeft: 10,
  },
});
