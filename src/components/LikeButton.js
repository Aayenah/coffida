/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/named */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function LikeButton({ isLiked, onLike }) {
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
      accessibilityHint="Unlike a review"
      accessibilityRole="button"
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
      accessibilityHint="Like a review"
      accessibilityRole="button"
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
