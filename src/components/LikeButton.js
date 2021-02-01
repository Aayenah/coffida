import React from 'react';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';

export default function LikeButton() {
  return (
    <Icon
      name="thumbs-up"
      type="font-awesome-5"
      color={colors.primary}
      size={18}
      raised
      style={{ margin: 0 }}
      onPress={() => console.log('like')}
    />
  );
}
