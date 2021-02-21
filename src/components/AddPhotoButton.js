import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function AddPhotoButton({ openCameraView }) {
  return (
    <Icon
      name="camera"
      type="font-awesome-5"
      color={colors.secondary}
      size={16}
      onPress={openCameraView}
      accessibilityLabel="Add photo button"
      accessibilityHint="Open camera to take photo for review"
      accessibilityRole="button"
    />
  );
}

AddPhotoButton.propTypes = {
  openCameraView: PropTypes.func.isRequired,
};
