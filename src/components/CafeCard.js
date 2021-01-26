import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import { getDistance, convertDistance } from 'geolib';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import AverageStars from './AverageStars';
import Distance from './Distance';
import AspectRating from './AspectRating';
import FavouritesButton from './FavouritesButton';
import * as RootNavigation from '../utility/RootNavigation';

const windowWidth = Dimensions.get('window').width;
export default function CafeCard({
  cafeId,
  cafeName,
  photo,
  avgOverallRating,
  avgQualityRating,
  avgPriceRating,
  avgCleanlinessRating,
  totalReviews,
}) {
  const [distance, setDistance] = useState(0);
  const [cafeCoord, setCafeCoord] = useState(null);

  async function getCurrentCoord() {
    let currentCoord = null;
    try {
      const currentLat = await AsyncStorage.getItem('@lat');
      const currentLng = await AsyncStorage.getItem('@lng');
      if (currentLat !== null && currentLng !== null) {
        currentCoord = { latitude: currentLat, longitude: currentLng };
        console.log(`${currentLat}, ${currentLng}`);
      }
    } catch (err) {
      console.log(`cannot retrieve coords ${err}`);
    }
    return currentCoord;
  }

  async function distanceInMiles() {
    const currentCoord = await getCurrentCoord();
    let inMiles = 0;
    if (currentCoord && cafeCoord) {
      const distanceInMeters = getDistance(currentCoord, cafeCoord);
      // const distanceInMeters = getDistance(currentCoord, cafeCoord);
      inMiles = convertDistance(distanceInMeters, 'mi');
      setDistance(inMiles);
    } else {
      console.log('currentCoords null');
    }
    console.log(inMiles);
    return inMiles;
  }

  function fetchCafeInfo() {
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${cafeId}`)
      .then((res) => res.json())
      .then((data) => {
        const coord = {
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
        };
        console.log(coord);
        setCafeCoord(coord);
      })
      .catch((err) => {
        // TODO: show alert to user
        console.log(`FETCH ERROR: ${err}`);
      });
  }

  useEffect(() => {
    fetchCafeInfo();
  }, []);

  useEffect(() => {
    distanceInMiles();
  }, [cafeCoord]);

  function goToCafeScreen() {
    RootNavigation.navigate('Cafe Screen', {
      cafeId,
      cafeName,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={goToCafeScreen}>
      <Card containerStyle={styles.card}>
        <ImageBackground source={{ uri: photo }} style={styles.img}>
          <FavouritesButton />
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.cafeName}>{cafeName}</Text>
            <Text style={styles.cafeName}>{cafeId}</Text>
            {distance > 0 ? <Distance miles={distance} /> : <Text>-</Text>}
          </View>
          <AverageStars avg={avgOverallRating} total={totalReviews} />
          <View style={styles.aspectRow}>
            <AspectRating aspect="Quality" rating={avgQualityRating} />
            <AspectRating aspect="Price" rating={avgPriceRating} />
            <AspectRating aspect="Cleanliness" rating={avgCleanlinessRating} />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

CafeCard.propTypes = {
  cafeId: PropTypes.number.isRequired,
  cafeName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  avgOverallRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  avgQualityRating: PropTypes.number.isRequired,
  avgPriceRating: PropTypes.number.isRequired,
  avgCleanlinessRating: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.8,
    height: 240,
    padding: 0,
    margin: 0,
    marginRight: 5,
  },
  img: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 150,
  },
  favIcon: {
    margin: 10,
  },
  cafeName: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aspectRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});
