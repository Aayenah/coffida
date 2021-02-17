import { getDistance, convertDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocationFromStorage() {
  let location = null;
  try {
    const json = await AsyncStorage.getItem('@location');
    location = JSON.parse(json);
  } catch (err) {
    console.warn('getLocationFromStorage: ', err);
  }
  return location;
}

async function getDistanceInMiles(cafeCoords) {
  let miles = -1;
  const location = await getLocationFromStorage();
  if (location) {
    const userCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const meters = getDistance(userCoords, cafeCoords);
    miles = convertDistance(meters, 'mi');
  }
  return miles;
}

module.exports = { getLocationFromStorage, getDistanceInMiles };
