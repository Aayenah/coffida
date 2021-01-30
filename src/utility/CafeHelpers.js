/* eslint-disable import/named */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BASE_URL,
  GET_LOCATION,
  FAV_LOCATION,
  FIND_LOCATION,
} from './Endpoints';
import { getUserTokenFromStorage } from './Authentication';

const fetchCafeInfo = async (id) => {
  let cafe = null;
  try {
    const res = await fetch(`${BASE_URL}${GET_LOCATION}/${id}`);
    cafe = await res.json();
  } catch (err) {
    console.log('ERROR! fetchCafeInfo: ', err);
  }
  return cafe;
};

async function fetchCafeList() {
  const token = await getUserTokenFromStorage();
  const options = {
    headers: {
      'X-Authorization': token,
    },
  };

  let cafes = [];
  try {
    const res = await fetch(`${BASE_URL}${FIND_LOCATION}`, options);
    cafes = await res.json();
  } catch (err) {
    console.log('ERROR! fetchCafeList: ', err);
  }
  return cafes;
}

module.exports = { fetchCafeInfo, fetchCafeList };
