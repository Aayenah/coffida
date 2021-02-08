/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import { likeReview, unlikeReview } from '../utility/ReviewHelpers';

export default function LikeButton({ isLiked, onLike }) {
  // const [isPressed, setIsPressed] = useState(false);

  // useEffect(() => {}, []);

  // async function onLike() {
  //   if (isPressed) {
  //     const res = await unlikeReview(locationId, reviewId);
  //     console.log('unlike res: ', res?.ok);
  //   } else {
  //     const res = await likeReview(locationId, reviewId);
  //     console.log('like res: ', res?.ok);
  //   }

  //   setIsPressed(!isPressed);
  // }

  return isLiked ? (
    <Button
      title="Liked"
      type="outline"
      containerStyle={styles.button_container}
      buttonStyle={styles.liked}
      titleStyle={styles.liked_title}
      icon={
        <Icon
          name="thumbs-up"
          type="font-awesome-5"
          color={colors.accent}
          size={14}
          // raised
          style={{ margin: 0 }}
        />
      }
      onPress={onLike}
    />
  ) : (
    <Button
      title="Like"
      containerStyle={styles.button_container}
      buttonStyle={styles.unliked}
      icon={
        <Icon
          name="thumbs-up"
          type="font-awesome-5"
          color="white"
          size={14}
          // raised
          style={{ margin: 0 }}
        />
      }
      onPress={onLike}
    />
  );
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button_container: {
    width: 70,
  },
  liked: {
    color: colors.accent,
    borderColor: colors.secondary,
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 14,
    height: 30,
  },
  liked_title: {
    color: colors.accent,
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 14,
  },
  unliked: {
    backgroundColor: colors.secondary,
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 14,
    height: 30,
  },
});
