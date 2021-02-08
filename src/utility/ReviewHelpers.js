/* eslint-disable import/named */
import { BASE_URL } from './Endpoints';
import { getUserTokenFromStorage } from './Authentication';
import { reviewBodyFilter } from '../config/filters';
import { isReviewBodyValid } from './InputValidator';

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

async function addNewReview(locationId, reviewObj) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    body: JSON.stringify(reviewObj),
  };

  let res = null;
  try {
    res = await fetch(`${BASE_URL}/location/${locationId}/review`, options);
  } catch (err) {
    console.log('ERROR! addNewReview: ', err);
  }
  return res;
}

async function updateReview(locationId, reviewId, reviewObj) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    body: JSON.stringify(reviewObj),
  };

  let res = null;
  try {
    res = await fetch(
      `${BASE_URL}/location/${locationId}/review/${reviewId}`,
      options,
    );
  } catch (err) {
    console.log('ERROR! updateReview: ', err);
  }
  return res;
}

async function deleteReview(locationId, reviewId) {
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
      `${BASE_URL}/location/${locationId}/review/${reviewId}`,
      options,
    );
  } catch (err) {
    console.log('ERROR! deleteReview: ', err);
  }
  return res;
}

async function addPhotoToReview(locationId, reviewId, data) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': token,
    },
    body: data,
  };

  let res = null;
  try {
    res = await fetch(
      `${BASE_URL}/location/${locationId}/review/${reviewId}/photo`,
      options,
    );
  } catch (err) {
    console.log('ERROR! addPhotoToReview: ', err);
  }
  return res;
}

async function getPhotoForReview(locationId, reviewId) {
  const token = await getUserTokenFromStorage();
  const options = {
    method: 'GET',
    headers: {
      'X-Authorization': token,
    },
  };

  let res = null;
  try {
    res = await fetch(
      `${BASE_URL}/location/${locationId}/review/${reviewId}/photo`,
      options,
    );
  } catch (err) {
    console.log('ERROR! getPhotoForReview: ', err);
  }
  return res;
}

async function deletePhotoFromReview(locationId, reviewId) {
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
      `${BASE_URL}/location/${locationId}/review/${reviewId}/photo`,
      options,
    );
  } catch (err) {
    console.log('ERROR! deletePhotoFromReview: ', err);
  }
  return res;
}

module.exports = {
  likeReview,
  unlikeReview,
  addNewReview,
  updateReview,
  deleteReview,
  addPhotoToReview,
  getPhotoForReview,
  deletePhotoFromReview,
};
