/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import { searchCafes } from '../utility/SearchHelpers';
import LoadingScreen from './LoadingScreen';
import colors from '../config/colors';
import MyReview from '../components/MyReview';
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
  const [optionsVisible, setOptionsVisible] = useState(false);
  const isFocused = useIsFocused();

  async function onSearch() {
    const queryObj = {
      q: query,
      overall,
      quality,
      price,
      cleanliness,
      searchIn,
    };

    const data = await searchCafes(queryObj);
    setCafeList(data);
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
      const queryObj = {
        q: query,
        overall,
        quality,
        price,
        cleanliness,
        searchIn,
      };
      const data = await searchCafes(queryObj);
      setCafeList(data);
    }
    prepareComponent();
  }, []);

  function onFilter() {
    setOptionsVisible(!optionsVisible);
  }

  const cafeListComponent = cafeList.map((r) => (
    <CafeListItem key={r.location_id} cafe={r} />
  ));

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
        <View style={styles.filter_row}>
          <FilterButton onFilter={onFilter} />
        </View>
        {optionsVisible && (
          <View style={styles.options}>
            <FilterOptions options={filterOptions} />
          </View>
        )}
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.list}>
          {cafeListComponent.length > 0 ? (
            cafeListComponent
          ) : (
            <Text style={styles.message}>No locations found.</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  search_container: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
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
  filter_row: {
    backgroundColor: 'floralwhite',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginBottom: 100,
  },
});
