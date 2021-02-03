/* eslint-disable no-useless-escape */
import { reviewBodyFilter } from '../config/filters';

const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

function isEmailValid(email) {
  if (!email) return false;
  if (email.length > 254) return false;
  console.log(`${email} - ${emailRegex.test(email)}`);
  return emailRegex.test(email);
}

function isNameValid(name) {
  if (!name) return false;
  if (name.length > 50) return false;
  console.log(`${name} - ${nameRegex.test(name)}`);
  return nameRegex.test(name);
}

function isPasswordValid(password) {
  if (!password) return false;
  if (password.length < 5) return false;
  return true;
}

function isReviewBodyValid(body) {
  const MIN_LENGTH = 3;
  const result = {
    valid: true,
    message: '',
  };

  if (!body) {
    result.valid = false;
    result.message = 'Review cannot be empty';
  }
  if (body.length < MIN_LENGTH) {
    result.valid = false;
    result.message = `Review must be at least ${MIN_LENGTH} characters long`;
  }

  const words = body.toLowerCase().split(' ');
  words.forEach((w) => {
    if (reviewBodyFilter.includes(w)) {
      result.valid = false;
      result.message = `Review cannot contain the words ${reviewBodyFilter}`;
    }
  });

  return result;
}

module.exports = {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isReviewBodyValid,
};
