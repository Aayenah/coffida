/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getLocationFromStorage } from '../utility/GeolocationHelpers';
import LoadingScreen from './LoadingScreen';

export default function MapScreen({ route }) {
  const { cafe } = route.params;
  const [userCoords, setUserCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function prepareComponent() {
      const location = await getLocationFromStorage();
      if (location) {
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserCoords(coords);
      }
    }
    prepareComponent();
  }, []);

  useEffect(() => {
    if (userCoords === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [userCoords]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: cafe.latitude,
          longitude: cafe.longitude,
          latitudeDelta: 0.092,
          longitudeDelta: 0.092,
        }}
      >
        <Marker
          coordinate={userCoords}
          title="My Location"
          description="I'm here"
        />
        <Marker
          coordinate={{ latitude: cafe.latitude, longitude: cafe.longitude }}
          title={cafe.location_name}
          description={cafe.location_town}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
