/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import CafeReview from '../components/CafeReview';
import LoadingScreen from './LoadingScreen';
import colors from '../config/colors';

export default function MyReviewsScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function prepareComponent() {
      const id = await getUserIdFromStorage();
      const currentUser = await getUserInfo(id);
      setUser(currentUser);
    }
    prepareComponent();
  }, []);

  if (!user) {
    return <LoadingScreen />;
  }

  const userReviewsList = user.reviews.map((r) => (
    <CafeReview key={r.review.review_id} cafe={r.location} review={r.review} />
  ));

  const noReviewsText = <Text>You do not have any reviews yet</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`My Reviews (${user.reviews.length})`}</Text>
      <View style={styles.list}>
        {user.reviews.length > 1 ? userReviewsList : noReviewsText}
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
  list: {
    marginBottom: 40,
  },
});
