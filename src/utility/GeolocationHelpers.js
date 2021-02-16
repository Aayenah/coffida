import AsyncStorage from '@react-native-async-storage/async-storage';

// async function saveCoordinates() {
//   try {
//     await AsyncStorage.setItem('@lat', currentCoord.lat);
//     await AsyncStorage.setItem('@lng', currentCoord.lng);
//   } catch (err) {
//     console.log(`ERROR saving location: ${err}`);
//   }
// }

// function startUpdatingLocation() {
//   RNLocation.subscribeToLocationUpdates((location) => {
//     const coord = {
//       lat: location[0].latitude.toString(),
//       lng: location[0].longitude.toString(),
//     };
//     setCurrentCoord(coord);
//     // saveCoordinates();
//   });
// }

// RNLocation.configure(config);
// RNLocation.requestPermission(permissions).then((granted) => {
//   if (granted) {
//     startUpdatingLocation();
//   } else {
//     console.log('LOCATION_DENIED');
//   }
// });

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

module.exports = { getLocationFromStorage };
