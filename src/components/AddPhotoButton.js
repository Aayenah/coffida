import React from 'react';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function AddPhotoButton({ openCameraView }) {
  return (
    <Icon
      name="camera"
      type="font-awesome-5"
      color={colors.primary}
      size={20}
      onPress={openCameraView}
    />
  );
}

AddPhotoButton.propTypes = {
  openCameraView: PropTypes.func.isRequired,
};
