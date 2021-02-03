import React from 'react';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function FavouritesButton({ isFav, onFav }) {
  return (
    <Icon
      name="heart"
      type="font-awesome-5"
      color={colors.primary}
      size={20}
      raised
      solid={isFav}
      onPress={onFav}
    />
  );
}

FavouritesButton.propTypes = {
  isFav: PropTypes.bool.isRequired,
  onFav: PropTypes.func.isRequired,
};
