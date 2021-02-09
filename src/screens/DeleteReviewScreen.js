/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, AirbnbRating, Button } from 'react-native-elements';
import colors from '../config/colors';
import SubmitReviewButton from '../components/SubmitReviewButton';
import { isReviewBodyValid } from '../utility/InputValidator';
import { deleteReview } from '../utility/ReviewHelpers';

export default function DeleteReviewScreen({ route, navigation }) {
  const [review, setReview] = useState(route.params.review);
  const [cafe, setCafe] = useState(route.params.cafe);
  // const { returnScreen } = route.params;
  const [overall, setOverall] = useState(review.overall_rating);
  const [quality, setQuality] = useState(review.quality_rating);
  const [price, setPrice] = useState(review.price_rating);
  const [cleanliness, setCleanliness] = useState(review.clenliness_rating);
  const [body, setBody] = useState(review.review_body);
  const [error, setError] = useState('');

  useEffect(() => {
    setOverall(review.overall_rating);
    setQuality(review.quality_rating);
    setPrice(review.price_rating);
    setCleanliness(review.clenliness_rating);
    setBody(review.review_body);
    setError('');
  }, []);

  // eslint-disable-next-line consistent-return
  async function onSubmitDelete() {
    setError('');

    const res = await deleteReview(cafe.location_id, review.review_id);

    if (res.ok) {
      navigation.goBack();
    } else {
      setError(`Failed to delete review - ${res?.status}`);
      Alert.alert('Error', `Failed to delete review - ${res?.status}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Overall</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={overall}
          size={20}
          showRating={false}
          selectedColor={colors.primary}
          isDisabled
        />
      </View>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Quality</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={quality}
          size={20}
          showRating={false}
          isDisabled
        />
      </View>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Price</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={price}
          size={20}
          showRating={false}
          isDisabled
        />
      </View>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Cleanliness</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={cleanliness}
          size={20}
          showRating={false}
          isDisabled
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.body}>
        <Input placeholder="Review" value={body} multiline disabled />
      </View>
      <View style={styles.submit_row}>
        <Button
          title="Delete"
          raised
          containerStyle={styles.button_container}
          buttonStyle={styles.button}
          onPress={onSubmitDelete}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  avg_number: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  stars: {
    marginRight: 10,
  },
  stars_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  body: {
    marginVertical: 0,
  },
  submit_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  msg: {
    color: 'darkgreen',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
