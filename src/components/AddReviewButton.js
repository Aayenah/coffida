/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/named */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function AddReviewButton({ onAdd }) {
  return (
    <Button
      title="  Add a review"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      icon={
        <Icon
          name="plus"
          type="font-awesome-5"
          color="white"
          size={14}
          style={{ margin: 0 }}
        />
      }
      onPress={onAdd}
      accessible
      accessibilityLabel="Add review"
      accessibilityHint="Add a review to cafe"
      accessibilityRole="button"
    />
  );
}

AddReviewButton.propTypes = {
  onAdd: PropTypes.func.isRequired,
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
