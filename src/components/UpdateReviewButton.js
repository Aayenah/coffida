import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function UpdateReviewButton({ onUpdate }) {
  return (
    <Icon
      name="pen"
      type="font-awesome-5"
      color={colors.secondary}
      size={16}
      onPress={onUpdate}
      accessibilityHint="Update a review"
      accessibilityRole="button"
    />
  );
}

UpdateReviewButton.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
