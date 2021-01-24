import React from 'react';
import { Icon } from 'react-native-elements';

export default function FavouritesButton() {
  return (
    <Icon
      name="heart"
      type="font-awesome-5"
      color="white"
      size={20}
      style={{ margin: 10 }}
    />
  );
}
