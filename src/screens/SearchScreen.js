/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { searchCafes } from '../utility/SearchHelpers';
import { getDistanceInMiles } from '../utility/GeolocationHelpers';
import colors from '../config/colors';
import CafeListItem from '../components/CafeListItem';
import FilterButton from '../components/FilterButton';
import FilterOptions from '../components/FilterOptions';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [overall, setOverall] = useState(0);
  const [quality, setQuality] = useState(0);
  const [price, setPrice] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [searchIn, setSearchIn] = useState('');
  const [cafeList, setCafeList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  async function onSearch() {
    setSearching(true);
    const queryObj = {
      q: query,
      overall,
      quality,
      price,
      cleanliness,
      searchIn,
    };

    const list = await searchCafes(queryObj);

    for (const c of list) {
      const cafeCoords = {
        latitude: c.latitude,
        longitude: c.longitude,
      };
      c.distance = await getDistanceInMiles(cafeCoords);
      console.log(`cafe name: ${c.location_name} - ${c.distance}`);
    }

    setCafeList(list);
    setSearching(false);
  }

  const filterOptions = {
    overall,
    setOverall,
    quality,
    setQuality,
    price,
    setPrice,
    cleanliness,
    setCleanliness,
    searchIn,
    setSearchIn,
    onSearch,
  };

  useEffect(() => {
    async function prepareComponent() {
      setSearching(true);
      const queryObj = {
        q: query,
        overall,
        quality,
        price,
        cleanliness,
        searchIn,
      };
      const list = await searchCafes(queryObj);

      for (const c of list) {
        const cafeCoords = {
          latitude: c.latitude,
          longitude: c.longitude,
        };
        c.distance = await getDistanceInMiles(cafeCoords);
        console.log(`cafe name: ${c.location_name} - ${c.distance}`);
      }

      setCafeList(list);
      setSearching(false);
    }
    prepareComponent();
  }, []);

  function onFilter() {
    setOptionsVisible(!optionsVisible);
  }

  // const sortedList = cafeList.sort((a, b) => {
  //   // sort by location name ascending
  //   if (a.location_name < b.location_name) return -1;
  //   if (a.location_name > b.location_name) return 1;
  //   return 0;
  // });

  const sortedByDistance = cafeList.sort((a, b) => {
    //* sort by distance descending
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  });

  let cafeListComponent = sortedByDistance.map((r) => (
    <CafeListItem key={r.location_id} cafe={r} />
  ));

  if (cafeListComponent.length < 1) {
    cafeListComponent = <Text style={styles.message}>No locations found</Text>;
  }

  return (
    <View>
      <View style={styles.controls}>
        <SearchBar
          placeholder="Search..."
          onChangeText={(value) => setQuery(value)}
          onSubmitEditing={onSearch}
          value={query}
          round
          containerStyle={styles.search_container}
          inputContainerStyle={styles.input_container}
          inputStyle={styles.input}
        />
        <View style={styles.filter_icon}>
          <FilterButton onFilter={onFilter} />
        </View>
      </View>
      <View style={styles.options}>
        {optionsVisible && (
          <View style={styles.options}>
            <FilterOptions options={filterOptions} />
          </View>
        )}
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.list}>
          {searching ? (
            // <Text style={styles.message}>No locations found.</Text>
            <ActivityIndicator size={50} color={colors.primary} />
          ) : (
            cafeListComponent
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'black',
  },
  message: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  search_container: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '80%',
  },
  input_container: {
    backgroundColor: 'white',
    color: 'white',
    height: 30,
  },
  input: {
    fontSize: 16,
    color: colors.bodyText,
  },
  filter_icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter_label: {
    color: 'white',
    fontSize: 14,
  },
  list: {
    marginBottom: 100,
  },
});
