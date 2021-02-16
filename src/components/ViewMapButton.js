/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import * as RootNavigation from '../utility/RootNavigation';

export default function ViewMapButton({ cafe }) {
  function openMapScreen() {
    RootNavigation.navigate('Map Screen', { cafe });
  }

  return (
    <Button
      title="  View On Map"
      type="clear"
      containerStyle={styles.button_container}
      buttonStyle={styles.button}
      titleStyle={styles.button}
      icon={
        <Icon
          name="map-marker-alt"
          type="font-awesome-5"
          color={colors.secondary}
          solid
        />
      }
      onPress={openMapScreen}
    />
  );
}

ViewMapButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  button_container: {
    width: '50%',
  },
  button: {
    color: colors.secondary,
  },
  text: {
    color: 'white',
  },
});
