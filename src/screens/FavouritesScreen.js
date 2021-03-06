/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import LoadingScreen from './LoadingScreen';
import colors from '../config/colors';
import CafeListItem from '../components/CafeListItem';

export default function FavouritesScreen() {
  const isFocused = useIsFocused();
  const [favList, setFavList] = useState(null);

  async function updateFavourites() {
    const id = await getUserIdFromStorage();
    const currentUser = await getUserInfo(id);
    if (currentUser) {
      setFavList(currentUser.favourite_locations);
    }
  }

  useEffect(() => {
    async function prepareComponent() {
      await updateFavourites();
    }
    prepareComponent();
  }, [isFocused]);

  if (favList === null) {
    return <LoadingScreen />;
  }

  const sortedList = favList.sort((a, b) => {
    // sort by location name ascending
    if (a.location_name < b.location_name) return -1;
    if (a.location_name > b.location_name) return 1;
    return 0;
  });

  const favListComponent = sortedList.map((r) => (
    <CafeListItem key={r.location_id} cafe={r} />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`My Favourites (${favList.length})`}</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.list}>
          {favListComponent.length > 0 ? (
            favListComponent
          ) : (
            <Text style={styles.message}>
              You have not added any cafes to your favourites
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
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
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  message: {
    fontFamily: 'Roboto',
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
    marginBottom: 50,
  },
});
