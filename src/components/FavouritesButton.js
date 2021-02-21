import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function FavouritesButton({ isFav, onFav, size }) {
  return (
    <Icon
      name="heart"
      type="font-awesome-5"
      color={colors.primary}
      size={size}
      raised
      solid={isFav}
      onPress={onFav}
      accessibilityLabel="Favourites button"
      accessibilityHint="Add cafe to favourites"
      accessibilityRole="button"
    />
  );
}

FavouritesButton.propTypes = {
  isFav: PropTypes.bool.isRequired,
  onFav: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};
