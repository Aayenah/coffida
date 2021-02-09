/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import { deletePhotoFromReview } from '../utility/ReviewHelpers';
import colors from '../config/colors';

export default function PhotoView({ route, navigation }) {
  const { url } = route.params;
  const { cafe } = route.params;
  const { review } = route.params;
  const { isOwned } = route.params;

  async function deletePhoto() {
    Alert.alert('Warning', 'Are you sure you want to delete this photo?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const res = await deletePhotoFromReview(
            cafe.location_id,
            review.review_id,
          );
          if (res.ok) {
            navigation.goBack();
          } else {
            Alert.alert('Error', `Failed to delete photo - ${res?.status}`);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: url }}
        style={styles.photo}
        resizeMode="cover"
      >
        {isOwned && (
          <Icon
            name="trash"
            type="font-awesome-5"
            color={colors.primary}
            size={16}
            raised
            solid
            onPress={deletePhoto}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  photo: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
  },
});
