import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function DeleteReviewButton({ onDelete }) {
  return (
    <Button
      title="Delete Review"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      onPress={onDelete}
    />
  );
}

DeleteReviewButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
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
