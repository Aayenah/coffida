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

    const data = await searchCafes(queryObj);
    setCafeList(data);
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
      const data = await searchCafes(queryObj);
      setCafeList(data);
      setSearching(false);
    }
    prepareComponent();
  }, []);

  function onFilter() {
    setOptionsVisible(!optionsVisible);
  }

  let cafeListComponent = cafeList.map((r) => (
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
