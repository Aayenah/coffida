/* eslint-disable import/named */
import { BASE_URL } from './Endpoints';
import { getUserTokenFromStorage } from './Authentication';
import { reviewBodyFilter } from '../config/filters';
import { isReviewBodyValid } from './InputValidator';

async function searchCafes(query) {
  const token = await getUserTokenFromStorage();
  const options = {
    headers: {
      'X-Authorization': token,
    },
  };

  let cafes = [];
  try {
    const res = await fetch(
      `${BASE_URL}/find` +
        `?q=${query.q}` +
        `&overall_rating=${query.overall}` +
        `&price_rating=${query.price}` +
        `&quality_rating=${query.quality}` +
        `&clenliness_rating=${query.cleanliness}` +
        `&search_in=${query.searchIn}`,
      options,
    );
    cafes = await res.json();
  } catch (err) {
    console.log('ERROR! searchCafes: ', err);
  }
  return cafes;
}

module.exports = {
  searchCafes,
};
