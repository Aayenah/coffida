import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BASE_URL,
  GET_USER,
  POST_ADD_USER,
  POST_LOGIN_USER,
  POST_LOGOUT_USER,
} from './Endpoints';

const login = async (email, password) => {
  try {
    await AsyncStorage.removeItem('@user_id');
    await AsyncStorage.removeItem('@token');
  } catch (err) {
    console.log('LOGIN: failed to reset storage');
  }
  let user = null;
  const credentials = { email, password };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };

  try {
    const res = await fetch(`${BASE_URL}${POST_LOGIN_USER}`, options);
    if (res.ok) {
      user = await res.json();
      await AsyncStorage.setItem('@user_id', user.id.toString());
      await AsyncStorage.setItem('@token', user.token.toString());
      const userInfo = await getUserInfo(user.id);
      console.log(`LOGGED IN: ${userInfo.email}`);
      await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
    } else {
      console.log(`failed to login in: ${res.status} - ${res.statusText}`);
    }
  } catch (err) {
    console.log(`login function: ${err}`);
  }
  return user;
};

const logout = async () => {
  try {
    const token = await getUserTokenFromStorage();
    const options = {
      method: 'POST',
      headers: {
        'X-Authorization': token,
      },
    };
    await AsyncStorage.removeItem('@user_id');
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@user');
    const res = await fetch(`${BASE_URL}${POST_LOGOUT_USER}`, options);
    console.log(res);
    console.log('successfully logged out user');
  } catch (err) {
    console.log(`logout function: ${err}`);
  }
};

const getUserInfo = async (id) => {
  if (!id) {
    console.log(`getUserInfo no id: ${id}`);
    return null;
  }
  const token = await getUserTokenFromStorage();
  let user = null;
  const options = {
    headers: {
      'X-Authorization': token,
    },
  };
  try {
    const res = await fetch(`${BASE_URL}${GET_USER}/${id}`, options);
    if (res.ok) {
      user = await res.json();
      console.log(`getUserInfo: ${user.email}`);
    }
  } catch (err) {
    console.log(`login function: ${err}`);
  }
  return user;
};

const getUserFromStore = async () => {
  let user = null;
  try {
    const jsonUser = await AsyncStorage.getItem('@user');
    user = jsonUser !== null ? JSON.parse(jsonUser) : null;
    // console.log(user);
  } catch (err) {
    console.log(`getUserFromStore: ${err}`);
  }
  return user;
};

const getUserIdFromStorage = async () => {
  let id = '';
  try {
    id = await AsyncStorage.getItem('@user_id');
  } catch (err) {
    console.log(`getUserId: ${err}`);
  }
  return id;
};

const getUserTokenFromStorage = async () => {
  let token = '';
  try {
    token = await AsyncStorage.getItem('@token');
  } catch (err) {
    console.log(`getUserToken: ${err}`);
  }
  return token;
};

module.exports = {
  login,
  logout,
  getUserInfo,
  getUserIdFromStorage,
  getUserTokenFromStorage,
  getUserFromStore,
};
