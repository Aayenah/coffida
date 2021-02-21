import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// eslint-disable-next-line import/named
import { getUserInfo, getUserIdFromStorage } from '../utility/Authentication';
import CafeReview from '../components/CafeReview';
import LoadingScreen from './LoadingScreen';

export default function UserReviewsScreen() {
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

  if (user.reviews.length < 1) {
    return <Text>You do not have any reviews yet</Text>;
  }

  const userReviewsList = user.reviews.map((r) => (
    <CafeReview key={r.review.review_id} cafe={r.location} review={r.review} />
  ));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>{userReviewsList}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  list: {
    marginBottom: 20,
  },
});
