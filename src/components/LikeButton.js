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

  return (
    <Button
      title={isLiked ? 'Liked' : 'Like'}
      type="outline"
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      titleStyle={styles.button}
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
  );
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  // button_container: {
  //   width: 90,
  // },
  // button: {
  //   backgroundColor: colors.accent,
  //   height: 35,
  // },
  // text: {
  //   color: 'white',
  // },
  button_container: {
    width: 70,
  },
  button: {
    color: colors.accent,
    borderColor: colors.accent,
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 14,
  },
});
