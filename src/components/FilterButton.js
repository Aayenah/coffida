/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import * as RootNavigation from '../utility/RootNavigation';

export default function FilterButton({ onFilter }) {
  return (
    <Button
      title="  Filter"
      type="clear"
      titleStyle={{ color: colors.primary }}
      icon={
        <Icon
          name="filter"
          type="font-awesome-5"
          color="white"
          solid
          size={14}
        />
      }
      onPress={onFilter}
    />
  );
}

FilterButton.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
