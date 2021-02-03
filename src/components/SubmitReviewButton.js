/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import { likeReview, unlikeReview } from '../utility/ReviewHelpers';

export default function SubmitReviewButton({ onSubmit }) {
  return (
    <Button
      title="Submit"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      onPress={onSubmit}
    />
  );
}

SubmitReviewButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button_container: {
    width: '50%',
  },
  button: {
    color: 'white',
    backgroundColor: colors.primary,
  },
});
