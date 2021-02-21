/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider, ButtonGroup } from 'react-native-elements';
import colors from '../config/colors';
import ApplyFilterButton from './ApplyFilterButton';

export default function FilterOptions({ options }) {
  const buttons = ['All', 'Favourites', 'Reviewed'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  function updateIndex(index) {
    setSelectedIndex(index);
    if (index === 0) {
      options.setSearchIn('');
    } else if (index === 1) {
      options.setSearchIn('favourite');
    } else {
      options.setSearchIn('reviewed');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.slider_row}>
        <Text style={styles.label}>Overall</Text>
        <Slider
          value={options.overall}
          onValueChange={options.setOverall}
          maximumValue={5}
          minimumValue={0}
          step={1}
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
        />
        <Text style={styles.value}>{options.overall}</Text>
      </View>
      <View style={styles.slider_row}>
        <Text style={styles.label}>Quality</Text>
        <Slider
          value={options.quality}
          onValueChange={options.setQuality}
          maximumValue={5}
          minimumValue={0}
          step={1}
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
        />
        <Text style={styles.value}>{options.quality}</Text>
      </View>
      <View style={styles.slider_row}>
        <Text style={styles.label}>Price</Text>
        <Slider
          value={options.price}
          onValueChange={options.setPrice}
          maximumValue={5}
          minimumValue={0}
          step={1}
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
        />
        <Text style={styles.value}>{options.price}</Text>
      </View>
      <View style={styles.slider_row}>
        <Text style={styles.label}>Cleanliness</Text>
        <Slider
          value={options.cleanliness}
          onValueChange={options.setCleanliness}
          maximumValue={5}
          minimumValue={0}
          step={1}
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
        />
        <Text style={styles.value}>{options.cleanliness}</Text>
      </View>
      <View style={styles.slider_row}>
        <Text style={styles.label}>Search In</Text>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.button_group}
          selectedButtonStyle={styles.selected_button}
        />
      </View>
      <View style={styles.apply_row}>
        <ApplyFilterButton onApply={options.onSearch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'floralwhite',
    paddingHorizontal: 10,
  },
  slider_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  slider: {
    width: '50%',
  },
  track: {
    // width: 100,
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: colors.secondary,
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    width: '20%',
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button_group: {
    height: 30,
    width: '70%',
  },
  selected_button: {
    backgroundColor: colors.secondary,
  },
  apply_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
});
