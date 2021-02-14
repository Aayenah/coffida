/* eslint-disable import/named */
import { BASE_URL } from './Endpoints';
import { getUserTokenFromStorage } from './Authentication';

const fetchCafeInfo = async (id) => {
  let cafe = null;
  try {
    const res = await fetch(`${BASE_URL}/location/${id}`);
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

  let cafes = null;
  try {
    const res = await fetch(`${BASE_URL}/find`, options);
    cafes = await res.json();
  } catch (err) {
    console.log('ERROR! fetchCafeList: ', err);
    cafes = null;
  }
  return cafes;
}

async function addToFavourites(locationId) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'POST',
    headers: {
      'X-Authorization': token,
    },
  };

  let res = null;
  try {
    res = await fetch(`${BASE_URL}/location/${locationId}/favourite`, options);
  } catch (err) {
    console.log('ERROR! addToFavourites: ', err);
  }
  return res;
}

async function removeFromFavourites(locationId) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'DELETE',
    headers: {
      'X-Authorization': token,
    },
  };

  let res = null;
  try {
    res = await fetch(`${BASE_URL}/location/${locationId}/favourite`, options);
  } catch (err) {
    console.log('ERROR! addToFavourites: ', err);
  }
  return res;
}

module.exports = {
  fetchCafeInfo,
  fetchCafeList,
  addToFavourites,
  removeFromFavourites,
};
