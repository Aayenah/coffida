/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import { addPhotoToReview } from '../utility/ReviewHelpers';
import colors from '../config/colors';

export default function CameraView({ route, navigation }) {
  const { review } = route.params;
  const [loading, setLoading] = useState(false);

  async function takePicture(camera) {
    setLoading(true);
    const options = { quality: 0.5, base64: true };
    try {
      const data = await camera.takePictureAsync(options);
      const res = await addPhotoToReview(
        review.review_location_id,
        review.review_id,
        data,
      );

      if (res.ok) {
        navigation.navigate('Cafe Screen');
      } else {
        Alert.alert('Error', `Failed to add photo - ${res?.status}`);
      }
    } catch (err) {
      Alert.alert('Error', `Failed to take picture - ${err}`);
    }
    setLoading(false);
  }

  // useEffect(() => {}, []);

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
          if (status !== 'READY') return <PendingView />;
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
    backgroundColor: 'black',
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
