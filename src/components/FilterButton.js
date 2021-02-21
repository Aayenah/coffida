/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

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
          color={colors.primary}
          solid
          size={14}
        />
      }
      onPress={onFilter}
      accessibilityHint="Show or hide filter options"
      accessibilityRole="button"
    />
  );
}

FilterButton.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
