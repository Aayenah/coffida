import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function DeleteReviewButton({ onDelete }) {
  return (
    <Icon
      name="trash"
      type="font-awesome-5"
      color={colors.secondary}
      size={16}
      onPress={onDelete}
    />
  );
}

DeleteReviewButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};
