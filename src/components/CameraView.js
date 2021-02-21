/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import { addPhotoToReview } from '../utility/ReviewHelpers';
import colors from '../config/colors';
import LoadingScreen from '../screens/LoadingScreen';

export default function CameraView({ route, navigation }) {
  const { review } = route.params;
  const { cafe } = route.params;
  const [loading, setLoading] = useState(false);

  async function takePicture(camera) {
    setLoading(true);
    const options = { quality: 0.5, base64: true };
    try {
      const data = await camera.takePictureAsync(options);
      const res = await addPhotoToReview(
        cafe.location_id,
        review.review_id,
        data,
      );

      if (res.ok) {
        navigation.goBack();
      } else {
        Alert.alert('Error', `Failed to add photo - ${res?.status}`);
      }
    } catch (err) {
      Alert.alert('Error', `Failed to take picture - ${err}`);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Icon
        name="times"
        type="font-awesome-5"
        color={colors.primary}
        size={14}
        raised
        onPress={() => navigation.goBack()}
        accessibilityLabel="Close camera"
        accessibilityHint="Navigate back to reviews screen"
        accessibilityRole="button"
      />
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <LoadingScreen />;
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Icon
                name="camera"
                type="font-awesome-5"
                color={colors.primary}
                size={30}
                raised
                solid
                disabled={loading}
                onPress={() => takePicture(camera)}
                accessibilityLabel="Take picture"
                accessibilityHint="Take a picture and go back to reviews screen"
                accessibilityRole="button"
              />
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
