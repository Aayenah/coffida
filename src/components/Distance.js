import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default function Distance({ miles }) {
  // const concat = `${miles.toFixed(1)} mi`;
  return (
    <View style={styles.container}>
      <Icon
        name="map-marker-alt"
        type="font-awesome-5"
        color="#424242"
        size={11}
        solid
        style={{ marginRight: 3 }}
      />
      <Text style={styles.value}>-</Text>
    </View>
  );
}

Distance.propTypes = {
  miles: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'olive',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 10,
  },
  value: {
    fontSize: 11,
    fontFamily: 'Roboto',
    color: '#424242',
  },
});
