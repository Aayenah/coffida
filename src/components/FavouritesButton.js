import React from 'react';
import { Icon, Button } from 'react-native-elements';
import colors from '../config/colors';

export default function FavouritesButton() {
  return (
    <Icon
      name="heart"
      type="font-awesome-5"
      color={colors.primary}
      size={20}
      raised
      style={{ margin: 0 }}
      onPress={() => console.log('fav')}
    />
  );
}
