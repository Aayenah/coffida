/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import { getPhotoForReview } from '../utility/ReviewHelpers';
import LoadingScreen from './LoadingScreen';
import colors from '../config/colors';
import MyReview from '../components/MyReview';

export default function MyReviewsScreen() {
  const [user, setUser] = useState(null);
  const isFocused = useIsFocused();

  async function updateUserData() {
    const id = await getUserIdFromStorage();
    const currentUser = await getUserInfo(id);
    if (currentUser) {
      for (const r of currentUser.reviews) {
        const res = await getPhotoForReview(
          r.location.location_id,
          r.review.review_id,
        );
        if (res.ok) {
          r.review.photoUrl = res.url;
        } else {
          r.review.photoUrl = 'none';
        }
      }
      setUser(currentUser);
    }
  }

  useEffect(() => {
    console.log('MyReviewsScreen focused? ', isFocused);
    async function prepareComponent() {
      await updateUserData();
    }
    prepareComponent();
  }, [isFocused]);

  if (!user) {
    return <LoadingScreen />;
  }

  const sortedList = user.reviews.sort((a, b) => {
    // sort by review id descending
    if (a.review.review_id < b.review.review_id) return 1;
    if (a.review.review_id > b.review.review_id) return -1;
    return 0;
  });

  const listComponent = sortedList.map((r) => {
    return (
      <MyReview
        key={r.review.review_id}
        cafe={r.location}
        review={r.review}
        returnScreen="My Reviews Screen"
      />
    );
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`My Reviews (${user.reviews.length})`}</Text>
      <View style={styles.list}>
        {listComponent.length > 0 ? (
          listComponent
        ) : (
          <Text style={styles.message}>You do not have any reviews yet</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'black',
  },
  message: {
    fontFamily: 'Roboto',
    color: colors.bodyText,
    marginTop: 20,
  },
  list: {
    marginBottom: 40,
  },
});
