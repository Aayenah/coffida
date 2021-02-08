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
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRating from './AspectRating';
import ReviewPlaceholder from './ReviewPlaceholder';
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

export default function MyReview({ user, review }) {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isOwned, setIsOwned] = useState(true);
  const [likes, setLikes] = useState(review.likes);

  async function checkReviewPhoto() {
    const data = await getPhotoForReview(
      review.review_location_id,
      review.review_id,
    );
    setImageData(data);
  }

  function openCameraView() {
    RootNavigation.navigate('Camera View', { review });
  }

  function onUpdateReview() {
    console.log(review);
    // RootNavigation.navigate('Update Review Screen', { review });
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
      await checkReviewPhoto();
      setInitials(
        `${user.first_name.charAt(0).toUpperCase()}${user.last_name
          .charAt(0)
          .toUpperCase()}`,
      );
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
          <Avatar
            size="medium"
            title={initials}
            rounded
            activeOpacity={0.7}
            containerStyle={styles.avatar}
          />
          <Text style={styles.full_name}>{fullName}</Text>
          <Text style={styles.menu}>{review.review_id}</Text>
          <View style={styles.controls}>
            <AddPhotoButton openCameraView={openCameraView} />
            <DeleteReviewButton onDelete={onDeleteReview} />
            <UpdateReviewButton onUpdate={onUpdateReview} />
          </View>
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
                    isOwned,
                  })
                }
              />
            </View>
          )}
          <Card.Divider style={{ marginBottom: 0 }} />
          <View style={styles.footer}>
            <Text style={styles.likes}>{`${likes} likes`}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

MyReview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
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
