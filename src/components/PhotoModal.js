/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { addPhotoToReview } from '../utility/ReviewHelpers';
import colors from '../config/colors';

export default function PhotoModal({ photoUrl, isVisible }) {
  const photos = [
    {
      url: photoUrl,
    },
  ];

  return (
    <Modal visible={isVisible} transparent>
      <ImageViewer imageUrls={photos} />
    </Modal>
  );
}

PhotoModal.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
