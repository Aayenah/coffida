/* eslint-disable import/named */
import { BASE_URL } from './Endpoints';
import { getUserTokenFromStorage } from './Authentication';

async function likeReview(locationId, reviewId) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'POST',
    headers: {
      'X-Authorization': token,
    },
  };

  let res = null;
  try {
    res = await fetch(
      `${BASE_URL}/location/${locationId}/review/${reviewId}/like`,
      options,
    );
  } catch (err) {
    console.log('ERROR! likeReivew: ', err);
  }
  return res;
}

async function unlikeReview(locationId, reviewId) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'DELETE',
    headers: {
      'X-Authorization': token,
    },
  };

  let res = null;
  try {
    res = await fetch(
      `${BASE_URL}/location/${locationId}/review/${reviewId}/like`,
      options,
    );
  } catch (err) {
    console.log('ERROR! likeReivew: ', err);
  }
  return res;
}

module.exports = { likeReview, unlikeReview };
