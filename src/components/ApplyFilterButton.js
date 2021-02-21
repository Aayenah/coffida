import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';

export default function ApplyFilterButton({ onApply }) {
  return (
    <Button
      title="Apply"
      raised
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      onPress={onApply}
      accessible
      accessibilityLabel="Apply filter"
      accessibilityHint="Apply filter with chosen parameters"
      accessibilityRole="button"
    />
  );
}

ApplyFilterButton.propTypes = {
  onApply: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button_container: {
    width: '30%',
  },
  button: {
    backgroundColor: colors.primary,
    height: 30,
  },
  text: {
    color: 'white',
  },
});
