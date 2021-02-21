/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function FilterButton({ onFilter }) {
  return (
    <Button
      title="  Filter"
      type="clear"
      titleStyle={styles.title}
      icon={
        <Icon
          name="filter"
          type="font-awesome-5"
          color="white"
          solid
          size={16}
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

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 14,
  },
});
